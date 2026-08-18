import { isPlatformServer } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable, makeStateKey, PLATFORM_ID, StateKey, TransferState, inject } from "@angular/core";
import { Router } from "@angular/router";

import { SanityDocument } from "@sanity/types";
import {
    BehaviorSubject, combineLatest, filter, first, map, Observable, of, ReplaySubject, retry, shareReplay, timer,
} from "rxjs";
import { FooterData, footerQuery, SANITY_QUERY_URL, SANITY_TOKEN, TopnavData, topbarQuery } from "typedb-web-common/lib";
import {
    ApplicationArticle, applicationArticleSchemaName, Article, articleFromApi, associateBy, BlogFilter,
    blogNullFilter, BlogPost, blogPostSchemaName, FundamentalArticle, fundamentalArticleSchemaName, groupBy,
    LegalDocument, legalDocumentSchemaName, SanityArticle, SanityBlogPost, SanityDataset, SanityLegalDocument,
    WordpressPost, WordpressPostSummary, wordpressReadingTimeMins,
} from "typedb-web-schema";

import { environment } from "src/environment/environment";

import { WordpressService } from "./wordpress.service";

const postsApiUrl = `https://public-api.wordpress.com/wp/v2/sites/typedb.wordpress.com/posts`;

interface WPV2Post {
    id: number;
    slug: string;
    content: { rendered: string };
}

/**
 * Retry configuration for HTTP calls with exponential backoff.
 * Retries: 3 attempts with delays of 1s, 2s, 4s (max ~7s total per request).
 * This handles intermittent network failures during prerendering.
 */
const RETRY_CONFIG = {
    count: 3,
    delay: (_error: any, retryCount: number) => timer(Math.min(1000 * Math.pow(2, retryCount - 1), 4000)),
};

@Injectable({
    providedIn: "root",
})
export class ContentService {
    public data: Observable<SanityDataset>;
    readonly wordpressPosts: Observable<WordpressPostSummary[]>;
    readonly blogPosts: Observable<BlogPost[]>;
    readonly displayedPosts: Observable<BlogPost[]>;
    readonly fundamentalArticles = new ReplaySubject<FundamentalArticle[]>();
    readonly applicationArticles = new ReplaySubject<ApplicationArticle[]>();
    readonly legalDocuments = new ReplaySubject<LegalDocument[]>();
    readonly blogFilter = new BehaviorSubject<BlogFilter>(blogNullFilter());

    private readonly footerData: Observable<FooterData>;
    private readonly topnavData: Observable<TopnavData>;
    private readonly platformId = inject(PLATFORM_ID);
    private readonly router = inject(Router);

    constructor(
        private http: HttpClient,
        private wordpress: WordpressService,
        private transferState: TransferState
    ) {
        // Sanity data - use shareReplay to cache and replay synchronously.
        // Image assets are projected down to the fields the site reads: full asset documents
        // carry ~700KB of unused metadata (lqip previews, palettes, exif) which would otherwise
        // dominate the TransferState payload shipped with every page (see isolate-ng-state.js).
        // NOTE: the SanityImageAsset type still declares the stripped fields - don't start
        // reading e.g. metadata.lqip without adding it to this projection.
        const contentQuery = `{
            "documents": *[!(_type match 'system.**') && _type != 'sanity.imageAsset'],
            "assets": *[_type == 'sanity.imageAsset']{ _id, _type, url, altText, extension, mimeType, metadata { dimensions } }
        }`;
        this.data = this.getSanityResult<{ documents: SanityDocument[]; assets: SanityDocument[] }>(contentQuery, "content").pipe(
            map(({ documents, assets }) => [...documents, ...assets]),
            map((result) => new SanityDataset({
                byType: groupBy(result, (x) => x._type),
                byId: associateBy(result, (x) => x._id),
            })),
            shareReplay(1),
        );

        this.footerData = this.getSanityResult<FooterData>(footerQuery, "footerContent").pipe(shareReplay(1));
        this.topnavData = this.getSanityResult<TopnavData>(topbarQuery, "topbarContent").pipe(shareReplay(1));

        // Only summaries are transferred to the browser - embedding every post's full HTML body
        // in each page's TransferState made prerendered pages ~10MB each and OOMed CI builds.
        // Article pages transfer their own post's content via getWordpressPostBySlug.
        const WORDPRESS_POSTS_KEY = makeStateKey<WordpressPostSummary[]>("wordpressPosts");
        this.wordpressPosts = this.handleTransferState(
            WORDPRESS_POSTS_KEY,
            this.wordpress.listPosts().pipe(
                retry(RETRY_CONFIG),
                map((posts) => posts.map((post) => ({
                    ID: post.ID,
                    slug: post.slug,
                    readingTimeMins: wordpressReadingTimeMins(post.content),
                }))),
            ),
        ).pipe(shareReplay(1));

        // Blog posts - derived from data and wordpressPosts, both of which use TransferState
        this.blogPosts = this.listPosts().pipe(shareReplay(1));

        this.listFundamentalArticles().subscribe((data) => {
            this.fundamentalArticles.next(data);
        });

        this.listApplicationArticles().subscribe((data) => {
            this.applicationArticles.next(data);
        });

        this.listLegalDocuments().subscribe((data) => {
            this.legalDocuments.next(data);
        });

        this.displayedPosts = combineLatest([this.blogPosts, this.blogFilter]).pipe(
            filter(([posts, _filter]) => !!posts?.length),
            map(([posts, blogFilter]) => {
                const postsList = posts || [];
                if ("categorySlug" in blogFilter) {
                    return postsList.filter((post) => (post.categories as string[]).includes(blogFilter.categorySlug));
                }
                return postsList;
            }),
            map((posts) => posts.sort((a, b) => b.date.getTime() - a.date.getTime())),
            shareReplay(1),
        );
    }

    getFooterData() {
        return this.footerData;
    }

    getTopbarData() {
        return this.topnavData;
    }

    getArticleBySlug<T extends Article = Article>(schemaName: string, slug: string): Observable<T> {
        return combineLatest([this.data, this.getWordpressPostBySlug(slug)]).pipe(
            map(([data, wpPost]) => {
                const sanityArticles = data.getDocumentsByType<SanityArticle>(schemaName);
                return articleFromApi(sanityArticles.find((x) => x.slug.current === slug)!, data, wpPost) as T;
            }),
            shareReplay(),
        );
    }

    getLegalDocumentBySlug(slug: string): Observable<LegalDocument> {
        return combineLatest([this.data, this.getWordpressPostBySlug(slug)]).pipe(
            map(([data, wpPost]) => {
                const sanityLegalDocuments = data.getDocumentsByType<SanityLegalDocument>(legalDocumentSchemaName);
                return LegalDocument.fromApi(sanityLegalDocuments.find((x) => x.slug.current === slug)!, data, wpPost);
            }),
            shareReplay(),
        );
    }

    // Transferred under a per-slug key, so each prerendered article page carries only its own
    // post body to the browser rather than the whole collection.
    private getWordpressPostBySlug(slug: string): Observable<WordpressPost> {
        const POST_KEY = makeStateKey<WordpressPost>(`wordpressPost-${slug}`);
        return this.handleTransferState(
            POST_KEY,
            this.http.get<WPV2Post[]>(`${postsApiUrl}?slug=${slug}`).pipe(
                retry(RETRY_CONFIG),
                map((wpPosts) => ({ ID: wpPosts[0].id, slug: wpPosts[0].slug, content: wpPosts[0].content.rendered })),
            ),
        );
    }

    private getSanityResult<T>(query: string, key: string): Observable<T> {
        const STATE_KEY = makeStateKey<T>(key);
        return this.handleTransferState(
            STATE_KEY,
            this.http.get<{ result: T }>(
                SANITY_QUERY_URL,
                ["production", "staging", "local"].includes(environment.env)
                    ? { params: { query, perspective: "published" } }
                    : { params: { query, perspective: "previewDrafts" }, headers: { Authorization: `Bearer ${SANITY_TOKEN}` } },
            ).pipe(
                retry(RETRY_CONFIG),
                // Transfer only the query result. The response envelope carries per-request
                // syncTags, which would make otherwise-identical page states differ
                // byte-for-byte and defeat cross-page sharing in isolate-ng-state.js.
                map(({ result }) => result),
            )
        ).pipe(first());
    }

    private handleTransferState<T>(stateKey: StateKey<T>, fetch$: Observable<T>): Observable<T> { // Ensure stateKey is StateKey<T>
        if (this.transferState.hasKey(stateKey)) {
            const cachedData = this.transferState.get<T>(stateKey, null as T); // Retrieve data from TransferState
            this.transferState.remove(stateKey);
            return of(cachedData);
        }

        return fetch$.pipe(
            first(),
            map((response) => {
                this.transferState.set(stateKey, response);
                return response;
            })
        );
    }

    private listPosts(): Observable<BlogPost[]> {
        return combineLatest([this.data, this.wordpressPosts]).pipe(
            map(([data, wpPosts]) => {
                return data
                    .getDocumentsByType<SanityBlogPost>(blogPostSchemaName)
                    .map(
                        (sanityPost) =>
                            [sanityPost, wpPosts.find((wpPost) => wpPost.slug === sanityPost.slug.current)] as [
                                SanityBlogPost,
                                WordpressPostSummary,
                            ],
                    )
                    .filter(([_sanityPost, wpPost]) => !!wpPost)
                    .map(([sanityPost, wpPost]) => BlogPost.fromSanityAndWPApi(sanityPost, data, wpPost));
            }),
        );
    }

    private listFundamentalArticles(): Observable<FundamentalArticle[]> {
        return this.listArticles(fundamentalArticleSchemaName);
    }

    private listApplicationArticles(): Observable<ApplicationArticle[]> {
        return this.listArticles(applicationArticleSchemaName);
    }

    private listArticles<T extends SanityArticle, U extends Article>(schemaName: string): Observable<U[]> {
        return combineLatest([this.data, this.wordpressPosts]).pipe(
            map(([data, wpPosts]) => {
                return data
                    .getDocumentsByType<T>(schemaName)
                    .map(
                        (sanityPost) =>
                            [sanityPost, wpPosts.find((wpPost) => wpPost.slug === sanityPost.slug.current)] as [
                                SanityArticle,
                                WordpressPostSummary,
                            ],
                    )
                    .filter(([_sanityPost, wpPost]) => !!wpPost)
                    .map(([sanityPost, wpPost]) => articleFromApi(sanityPost, data, wpPost) as U);
            }),
        );
    }

    private listLegalDocuments(): Observable<LegalDocument[]> {
        return combineLatest([this.data, this.wordpressPosts]).pipe(
            map(([data, wpPosts]) => {
                return data
                    .getDocumentsByType<SanityLegalDocument>(legalDocumentSchemaName)
                    .map(
                        (sanityDocument) =>
                            [sanityDocument, wpPosts.find((wpPost) => wpPost.slug === sanityDocument.slug.current)] as [
                                SanityLegalDocument,
                                WordpressPostSummary,
                            ],
                    )
                    .filter(([_sanityDocument, wpPost]) => !!wpPost)
                    .map(([sanityDocument, wpPost]) => LegalDocument.fromApi(sanityDocument, data, wpPost));
            }),
        );
    }

    /**
     * Handles content not found errors during prerendering.
     * During SSR, this will fail the build immediately to prevent deploying broken pages.
     * In the browser, this navigates to the 404 page.
     */
    handleContentNotFound(): void {
        if (isPlatformServer(this.platformId)) {
            const route = this.router.url;
            console.error(`\n❌ Prerender failed: Content not found during SSR`);
            console.error(`   Route: ${route}`);
            console.error(`\nBuild failed: A page failed to load content during prerendering.\n`);
            process.exit(1);
        }

        this.router.navigate(["404"], { skipLocationChange: true });
    }
}

import { isPlatformServer } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable, makeStateKey, PLATFORM_ID, StateKey, TransferState, inject } from "@angular/core";
import { Router } from "@angular/router";

import { SanityDocument } from "@sanity/types";
import {
    BehaviorSubject, combineLatest, concat, filter, first, iif, map, Observable, of, ReplaySubject, retry, shareReplay,
    switchMap, timer,
} from "rxjs";
import { FooterData, footerQuery, SANITY_QUERY_URL, SANITY_TOKEN, TopnavData, topbarQuery } from "typedb-web-common/lib";
import {
    ApplicationArticle, applicationArticleSchemaName, Article, articleFromApi, associateBy, BlogCategoryID, BlogFilter,
    blogNullFilter, BlogPost, blogPostSchemaName, FundamentalArticle, fundamentalArticleSchemaName, groupBy,
    LegalDocument, legalDocumentSchemaName, SanityArticle, SanityBlogPost, SanityDataset, SanityLegalDocument,
    WordpressPost,
} from "typedb-web-schema";

import { environment } from "src/environment/environment";

import { WordpressService } from "./wordpress.service";

const postsApiUrl = `https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com/posts`;

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
    readonly wordpressPosts: Observable<WordpressPost[]>;
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
        // Sanity data - use shareReplay to cache and replay synchronously
        this.data = this.getSanityResult<SanityDocument[]>("*[!(_type match 'system.**')]", "content").pipe(
            map((result) => new SanityDataset({
                byType: groupBy(result, (x) => x._type),
                byId: associateBy(result, (x) => x._id),
            })),
            shareReplay(1),
        );

        this.footerData = this.getSanityResult<FooterData>(footerQuery, "footerContent").pipe(shareReplay(1));
        this.topnavData = this.getSanityResult<TopnavData>(topbarQuery, "topbarContent").pipe(shareReplay(1));

        const WORDPRESS_POSTS_KEY = makeStateKey<WordpressPost[]>("wordpressPosts");
        this.wordpressPosts = this.handleTransferState(
            WORDPRESS_POSTS_KEY,
            this.wordpress.listPosts().pipe(retry(RETRY_CONFIG)),
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

    getArticleBySlug<T extends Article>(articles$: Observable<T[]>, schemaName: string, slug: string): Observable<T> {
        return articles$.pipe(
            switchMap((articles) => {
                const article = articles.find((article) => article.slug === slug);
                return iif(
                    () => !!article,
                    of(article as T),
                    this.fetchArticleBySlug<T>(schemaName, slug),
                );
            }),
        );
    }

    private fetchArticleBySlug<T extends Article>(schemaName: string, slug: string): Observable<T> {
        return combineLatest([
            this.data,
            this.http.get<WordpressPost>(`${postsApiUrl}/slug:${slug}`).pipe(retry(RETRY_CONFIG)),
        ]).pipe(
            map(([data, wpPost]) => {
                const sanityArticles = data.getDocumentsByType<SanityArticle>(schemaName);
                return articleFromApi(sanityArticles.find((x) => x.slug.current === slug)!, data, wpPost) as T;
            }),
            shareReplay(),
        );
    }

    getLegalDocumentBySlug(slug: string): Observable<LegalDocument> {
        return this.legalDocuments.pipe(
            switchMap((documents) => {
                const document = documents.find((document) => document.slug === slug);
                return iif(
                    () => !!document,
                    concat(of(document), this.fetchLegalDocumentBySlug(slug)),
                    this.fetchLegalDocumentBySlug(slug),
                ) as Observable<LegalDocument>;
            }),
        );
    }

    private fetchLegalDocumentBySlug(slug: string): Observable<LegalDocument> {
        return combineLatest([
            this.data,
            this.http.get<WordpressPost>(`${postsApiUrl}/slug:${slug}`).pipe(retry(RETRY_CONFIG)),
        ]).pipe(
            map(([data, wpPost]) => {
                const sanityLegalDocuments = data.getDocumentsByType<SanityLegalDocument>(legalDocumentSchemaName);
                return LegalDocument.fromApi(sanityLegalDocuments.find((x) => x.slug.current === slug)!, data, wpPost);
            }),
            shareReplay(),
        );
    }

    getPostsByCategory(categorySlug: BlogCategoryID): Observable<BlogPost[]> {
        return this.blogPosts.pipe(map((posts) => posts.filter((post) => post.categories.includes(categorySlug))));
    }

    private getSanityResult<T>(query: string, key: string): Observable<T> {
        const STATE_KEY = makeStateKey<{ result: T }>(key);
        return this.handleTransferState(
            STATE_KEY,
            this.http.get<{ result: T }>(
                SANITY_QUERY_URL,
                ["production", "staging", "local"].includes(environment.env)
                    ? { params: { query, perspective: "published" } }
                    : { params: { query, perspective: "previewDrafts" }, headers: { Authorization: `Bearer ${SANITY_TOKEN}` } },
            ).pipe(retry(RETRY_CONFIG))
        ).pipe(
            first(),
            map(({ result }) => result),
        );
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
                                WordpressPost,
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
                                WordpressPost,
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
                                WordpressPost,
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

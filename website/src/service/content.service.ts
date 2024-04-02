import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { SanityDocument } from "@sanity/types";
import { TransferStateService } from "@scullyio/ng-lib";
import {
    BehaviorSubject,
    combineLatest,
    concat,
    filter,
    first,
    iif,
    map,
    Observable,
    of,
    ReplaySubject,
    shareReplay,
    switchMap,
} from "rxjs";
import {
    FooterData,
    footerQuery,
    SANITY_QUERY_URL,
    SANITY_TOKEN,
    TopbarData,
    topbarQuery,
} from "typedb-web-common/lib";
import {
    ApplicationArticle,
    applicationArticleSchemaName,
    Article,
    articleFromApi,
    associateBy,
    BlogCategoryID,
    BlogFilter,
    blogNullFilter,
    BlogPost,
    blogPostSchemaName,
    FundamentalArticle,
    fundamentalArticleSchemaName,
    groupBy,
    LegalDocument,
    legalDocumentSchemaName,
    SanityArticle,
    SanityBlogPost,
    SanityDataset,
    SanityLegalDocument,
    WordpressPost,
} from "typedb-web-schema";

import { environment } from "src/environment/environment";

import { WordpressService } from "./wordpress.service";

const postsApiUrl = `https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com/posts`;

@Injectable({
    providedIn: "root",
})
export class ContentService {
    public data = new ReplaySubject<SanityDataset>();
    readonly wordpressPosts: Observable<WordpressPost[]>;
    readonly blogPosts = new ReplaySubject<BlogPost[]>();
    readonly displayedPosts: Observable<BlogPost[]>;
    readonly fundamentalArticles = new ReplaySubject<FundamentalArticle[]>();
    readonly applicationArticles = new ReplaySubject<ApplicationArticle[]>();
    readonly legalDocuments = new ReplaySubject<LegalDocument[]>();
    readonly blogFilter = new BehaviorSubject<BlogFilter>(blogNullFilter());

    private readonly footerData: Observable<FooterData>;
    private readonly topbarData: Observable<TopbarData>;

    constructor(
        private http: HttpClient,
        private wordpress: WordpressService,
        private transferState: TransferStateService,
    ) {
        this.getSanityResult<SanityDocument[]>("*[!(_type match 'system.**')]", "content").subscribe((result) => {
            this.data.next(
                new SanityDataset({
                    byType: groupBy(result, (x) => x._type),
                    byId: associateBy(result, (x) => x._id),
                }),
            );
        });
        this.footerData = this.getSanityResult<FooterData>(footerQuery, "footerContent").pipe(shareReplay(1));
        this.topbarData = this.getSanityResult<TopbarData>(topbarQuery, "topbarContent").pipe(shareReplay(1));
        this.wordpressPosts = this.transferState.useScullyTransferState("wordpressPosts", this.wordpress.listPosts())
            .pipe(
                switchMap((data) => {
                    if (data?.length) return of(data);
                    else return this.wordpress.listPosts(); // fall back to loading live. should patch away WP flakiness
                }),
                shareReplay(),
            );
        this.listPosts().subscribe((data) => {
            this.blogPosts.next(data);
        });
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
            map(([posts, filter]) => {
                const postsList = posts || [];
                if ("categorySlug" in filter)
                    return postsList.filter((post) => (post.categories as string[]).includes(filter.categorySlug));
                return postsList;
            }),
            map((posts) => posts.sort((a, b) => b.date.getTime() - a.date.getTime())),
            shareReplay(),
        );
    }

    getFooterData() {
        return this.footerData;
    }

    getTopbarData() {
        return this.topbarData;
    }

    getArticleBySlug<T extends Article>(articles$: Observable<T[]>, schemaName: string, slug: string): Observable<T> {
        return articles$.pipe(
            switchMap((articles) => {
                const article = articles.find((article) => article.slug === slug);
                return iif(
                    () => !!article,
                    concat(of(article as T), this.fetchArticleBySlug<T>(schemaName, slug)),
                    this.fetchArticleBySlug<T>(schemaName, slug),
                );
            }),
        );
    }

    private fetchArticleBySlug<T extends Article>(schemaName: string, slug: string): Observable<T> {
        return combineLatest([this.data, this.http.get<WordpressPost>(`${postsApiUrl}/slug:${slug}`)]).pipe(
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
        return combineLatest([this.data, this.http.get<WordpressPost>(`${postsApiUrl}/slug:${slug}`)]).pipe(
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

    private getSanityResult<T>(query: string, name: string): Observable<T> {
        return this.transferState
            .useScullyTransferState(
                name,
                this.http.get<{ result: T }>(
                    SANITY_QUERY_URL,
                    environment.production
                        ? {
                              params: { query, perspective: "published" },
                          }
                        : {
                              params: { query, perspective: "previewDrafts" },
                              headers: { Authorization: `Bearer ${SANITY_TOKEN}` },
                          },
                ),
            )
            .pipe(
                first(),
                map(({ result }) => result),
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
                    .map(([sanityPost, wpPost]) => BlogPost.fromApi(sanityPost, data, wpPost));
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
}

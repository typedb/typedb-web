import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { SanityDocument } from "@sanity/types";
import { TransferStateService } from "@scullyio/ng-lib";
import {
    BehaviorSubject,
    combineLatest,
    concat,
    filter,
    iif,
    map,
    Observable,
    of,
    ReplaySubject,
    shareReplay,
    switchMap,
} from "rxjs";
import { SANITY_QUERY_URL, SANITY_TOKEN, TopbarData, topbarQuery } from "typedb-web-common/lib";
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
    SanityArticle,
    SanityBlogPost,
    SanityDataset,
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
    readonly blogFilter = new BehaviorSubject<BlogFilter>(blogNullFilter());

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
        this.topbarData = this.getSanityResult<TopbarData>(topbarQuery, "topbarContent").pipe(shareReplay(1));
        this.wordpressPosts = this.transferState
            .useScullyTransferState("wordpressPosts", this.wordpress.listPosts())
            .pipe(
                filter((data) => !!data?.length),
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

    getPostsByCategory(categorySlug: BlogCategoryID): Observable<BlogPost[]> {
        return this.blogPosts.pipe(map((posts) => posts.filter((post) => post.categories.includes(categorySlug))));
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
            .pipe(map(({ result }) => result));
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

    private listArticles<T extends SanityArticle, U extends Article>(
        schemaName: string,
        limit = 100,
        offset = 0,
    ): Observable<U[]> {
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
}

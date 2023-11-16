import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

import { ContentEndpointService } from "./content-endpoint.service";
import { WordpressService } from "./wordpress.service";

const postsApiUrl = `https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com/posts`;

@Injectable({
    providedIn: "root",
})
export class ContentService {
    public data = new ReplaySubject<SanityDataset>();
    readonly wordpressPosts: Observable<WordpressPost[]>;
    readonly blogPosts: Observable<BlogPost[]>;
    readonly displayedPosts: Observable<BlogPost[]>;
    readonly fundamentalArticles = new ReplaySubject<FundamentalArticle[]>();
    readonly applicationArticles: Observable<ApplicationArticle[]>;
    readonly blogFilter = new BehaviorSubject<BlogFilter>(blogNullFilter());

    constructor(
        private http: HttpClient,
        private endpoint: ContentEndpointService,
        private wordpress: WordpressService,
        private transferState: TransferStateService,
    ) {
        this.endpoint.getContent().subscribe((data) => {
            this.data.next(
                new SanityDataset({
                    byType: groupBy(data.result, (x) => x._type),
                    byId: associateBy(data.result, (x) => x._id),
                }),
            );
        });
        this.wordpressPosts = this.transferState.useScullyTransferState("wordpressPosts", this.wordpress.listPosts());
        this.blogPosts = this.listPosts().pipe(shareReplay());
        this.listFundamentalArticles().subscribe((data) => {
            this.fundamentalArticles.next(data);
        });
        this.applicationArticles = this.listApplicationArticles();
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

    getPostsByCategory(categorySlug: BlogCategoryID): Observable<BlogPost[]> {
        return this.blogPosts.pipe(map((posts) => posts.filter((post) => post.categories.includes(categorySlug))));
    }
}

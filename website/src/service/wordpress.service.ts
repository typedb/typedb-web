import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { TransferStateService } from "@scullyio/ng-lib";
import { BehaviorSubject, combineLatest, concat, filter, iif, map, Observable, of, shareReplay, switchMap } from "rxjs";
import {
    ApplicationArticle,
    applicationArticleSchemaName,
    Article,
    articleFromApi,
    BlogCategoryID,
    BlogFilter,
    blogNullFilter,
    BlogPost,
    blogPostSchemaName,
    FundamentalArticle,
    fundamentalArticleSchemaName,
    SanityArticle,
    SanityBlogPost,
    WordpressPost,
    WordpressPosts,
} from "typedb-web-schema";

import { ContentService } from "./content.service";

const postsApiUrl = `https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com/posts`;

@Injectable({
    providedIn: "root",
})
export class WordpressService {
    readonly blogPosts: Observable<BlogPost[]>;
    readonly displayedPosts: Observable<BlogPost[]>;
    readonly fundamentalArticles: Observable<FundamentalArticle[]>;
    readonly applicationArticles: Observable<ApplicationArticle[]>;
    readonly filter = new BehaviorSubject<BlogFilter>(blogNullFilter());

    constructor(
        private _http: HttpClient,
        private contentService: ContentService,
        private transferState: TransferStateService,
    ) {
        // TODO: without this filter(), we get 'cannot read property of undefined' errors in production.
        //  We should figure out why this filter() fixes the issue, and if there is a better way
        this.blogPosts = this.transferState.useScullyTransferState("blogPosts", this.listPosts()).pipe(
            filter((data) => !!data?.length),
            shareReplay(),
        ); // TODO: currently this is only the first 100 posts - add ability to get more
        this.fundamentalArticles = this.transferState
            .useScullyTransferState("fundamentalArticles", this.listFundamentalArticles())
            .pipe(
                filter((data) => !!data?.length),
                shareReplay(),
            );
        this.applicationArticles = this.transferState
            .useScullyTransferState("applicationArticles", this.listApplicationArticles())
            .pipe(
                filter((data) => !!data?.length),
                shareReplay(),
            );
        this.displayedPosts = combineLatest([this.blogPosts, this.filter]).pipe(
            filter(([posts, _filter]) => !!posts?.length),
            map(([posts, filter]) => {
                const postsList = posts || [];
                if ("categorySlug" in filter)
                    return postsList.filter((post) => (post.categories as string[]).includes(filter.categorySlug));
                return postsList;
            }),
            map((posts) => posts.sort((a, b) => b.date - a.date)),
            shareReplay(),
        );
    }

    private listWordpressPosts(limit = 100, offset = 0): Observable<WordpressPost[]> {
        return this._http
            .get<WordpressPosts>(`${postsApiUrl}?meta=sharing-buttons&number=${limit}&offset=${offset}`)
            .pipe(map((res) => res.posts));
    }

    private listPosts(limit = 100, offset = 0): Observable<BlogPost[]> {
        return combineLatest([this.contentService.data, this.listWordpressPosts(limit, offset)]).pipe(
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
        return combineLatest([this.contentService.data, this.listWordpressPosts(limit, offset)]).pipe(
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
        return combineLatest([
            this.contentService.data,
            this._http.get<WordpressPost>(`${postsApiUrl}/slug:${slug}`),
        ]).pipe(
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

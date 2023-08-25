import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransferStateService } from "@scullyio/ng-lib";
import { BehaviorSubject, combineLatest, first, map, Observable, race, shareReplay, iif, of, switchMap } from "rxjs";
import {
    WordpressPost,
    WordpressTaxonomy,
    WordpressPosts,
    WordpressSite,
    WordpressCategoriesResponse,
    BlogFilter,
    blogNullFilter,
    WordpressACF,
    WordpressACFResponse,
} from "typedb-web-schema";

const siteApiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com";
const postsApiUrl = `${siteApiUrl}/posts`;
const categoriesApiUrl = `${siteApiUrl}/categories`;
const acfApiUrl = `https://typedb.wpcomstaging.com/wp-json/acf/v3/posts`;

@Injectable({
    providedIn: "root",
})
export class BlogService {
    readonly site: Observable<WordpressSite>;
    readonly fetchedPosts: Observable<WordpressPost[]>;
    readonly displayedPosts: Observable<WordpressPost[]>;
    readonly categories: Observable<WordpressTaxonomy[]>;
    readonly acf: Observable<WordpressACFResponse>;
    readonly filter = new BehaviorSubject<BlogFilter>(blogNullFilter());

    constructor(
        private _http: HttpClient,
        private transferState: TransferStateService,
    ) {
        this.site = this._http.get<WordpressSite>(siteApiUrl).pipe(shareReplay());
        this.fetchedPosts = this.listPosts().pipe(shareReplay());
        this.categories = this.listCategories().pipe(shareReplay());
        this.acf = this.listCustomFields().pipe(shareReplay());
        // this.site = this.transferState
        //     .useScullyTransferState("blogSite", this._http.get<WordpressSite>(siteApiUrl))
        //     .pipe(shareReplay());
        // this.fetchedPosts = this.transferState
        //     .useScullyTransferState("blogAllPosts", this.listPosts())
        //     .pipe(shareReplay()); // TODO: currently this is only the first 100 posts - add ability to get more
        // this.categories = this.transferState
        //     .useScullyTransferState("blogCategories", this.listCategories())
        //     .pipe(shareReplay());
        // this.acf = this.transferState.useScullyTransferState("blogACF", this.listCustomFields()).pipe(shareReplay());
        this.displayedPosts = combineLatest([this.fetchedPosts, this.filter]).pipe(
            map(([posts, filter]) => {
                if ("categorySlug" in filter)
                    return posts.filter((post) =>
                        Object.values(post.categories)
                            .map((cat) => cat.slug)
                            .includes(filter.categorySlug),
                    );
                return posts;
            }),
            map((posts) => posts.sort((a, b) => a.menu_order - b.menu_order)),
            shareReplay(),
        );
    }

    private listCategories(): Observable<WordpressTaxonomy[]> {
        return this._http.get<WordpressCategoriesResponse>(categoriesApiUrl).pipe(map((res) => res.categories));
    }

    private listPosts(limit = 100, offset = 0): Observable<WordpressPost[]> {
        return this._http
            .get<WordpressPosts>(`${postsApiUrl}?meta=sharing-buttons&number=${limit}&offset=${offset}`)
            .pipe(map((res) => res.posts));
    }

    getPostBySlug(slug: string): Observable<WordpressPost> {
        return this.fetchedPosts.pipe(
            switchMap((posts) => {
                const post = posts.find((post) => post.slug === slug);
                return iif(() => !!post, of(post!), this.fetchPostBySlug(slug));
            }),
        );
    }

    private fetchPostBySlug(slug: string): Observable<WordpressPost> {
        return this._http.get<WordpressPost>(`${postsApiUrl}/slug:${slug}`).pipe(shareReplay());
    }

    getPostsByCategory(category: WordpressTaxonomy): Observable<WordpressPost[]> {
        return this.fetchedPosts.pipe(
            map((posts) =>
                posts.filter((post) =>
                    Object.values(post.categories)
                        .map((cat) => cat.slug)
                        .includes(category.slug),
                ),
            ),
        );
    }

    listCustomFields(): Observable<WordpressACFResponse> {
        return this._http.get<WordpressACFResponse>(acfApiUrl).pipe(shareReplay());
    }

    getCustomFieldsForPost(post: WordpressPost) {
        return this.acf.pipe(
            map((acf) => {
                return acf.find((entry) => entry.id === post.ID)!.acf;
            }),
        );
    }

    // private fetchPostsByCategory(category: WordpressTaxonomy): Observable<WordpressPost[]> {
    //     return this._http.get<WordpressPosts>(`${postsApiUrl}?category=${category.slug}`).pipe(map((res) => res.posts));
    // }
}

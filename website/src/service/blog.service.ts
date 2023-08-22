import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransferStateService } from "@scullyio/ng-lib";
import { BehaviorSubject, combineLatest, first, map, Observable, Subject, shareReplay } from "rxjs";
import {
    WordpressPost,
    WordpressTaxonomy,
    WordpressPosts,
    WordpressSite,
    WordpressCategoriesResponse,
    BlogFilter,
    blogNullFilter,
} from "typedb-web-schema";

const siteApiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com";
const postsApiUrl = `${siteApiUrl}/posts`;
const categoriesApiUrl = `${siteApiUrl}/categories`;

@Injectable({
    providedIn: "root",
})
export class BlogService {
    readonly site$: Observable<WordpressSite>;
    readonly allPosts$: Observable<WordpressPosts>;
    currentPosts$: Observable<WordpressPost[]>;
    readonly categories$: Observable<WordpressTaxonomy[]>;
    readonly filter$ = new BehaviorSubject<BlogFilter>(blogNullFilter());

    constructor(
        private _http: HttpClient,
        private transferState: TransferStateService,
    ) {
        this.site$ = this.transferState
            .useScullyTransferState("blogSite", this._http.get<WordpressSite>(siteApiUrl))
            .pipe(first(), shareReplay());
        this.allPosts$ = this.transferState
            .useScullyTransferState("blogAllPosts", this._http.get<WordpressPosts>(postsApiUrl))
            .pipe(first(), shareReplay());
        this.categories$ = this.transferState
            .useScullyTransferState("blogCategories", this.getAllCategories())
            .pipe(first(), shareReplay());
        this.currentPosts$ = combineLatest([this.allPosts$.pipe(map((res) => res.posts)), this.filter$]).pipe(
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

    private getAllCategories(): Observable<WordpressTaxonomy[]> {
        return this._http.get<WordpressCategoriesResponse>(categoriesApiUrl).pipe(map((res) => res.categories));
    }

    getPostBySlug(slug: string): Observable<WordpressPost> {
        return this._http.get<WordpressPost>(`${postsApiUrl}/slug:${slug}`);
    }

    getPostsByCategory(category: WordpressTaxonomy): Observable<WordpressPosts> {
        return this._http.get<WordpressPosts>(`${postsApiUrl}?category=${category.slug}`);
    }
}

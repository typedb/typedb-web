import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransferStateService } from "@scullyio/ng-lib";
import { first, map, Observable } from "rxjs";
import {
    WordpressPost,
    WordpressTaxonomy,
    WordpressPosts,
    WordpressSite,
    WordpressCategoriesResponse,
} from "typedb-web-schema";

const siteApiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com";
const postsApiUrl = `${siteApiUrl}/posts`;
const categoriesApiUrl = `${siteApiUrl}/categories`;

@Injectable({
    providedIn: "root",
})
export class BlogService {
    readonly site$: Observable<WordpressSite>;
    readonly posts$: Observable<WordpressPosts>;
    readonly categories$: Observable<WordpressTaxonomy[]>;

    constructor(
        private _http: HttpClient,
        private transferState: TransferStateService,
    ) {
        this.site$ = this.transferState
            .useScullyTransferState("blogSite", this._http.get<WordpressSite>(siteApiUrl))
            .pipe(first());
        this.posts$ = this.transferState
            .useScullyTransferState("blogPosts", this._http.get<WordpressPosts>(postsApiUrl))
            .pipe(first());
        this.categories$ = this.transferState
            .useScullyTransferState("blogCategories", this.getAllCategories())
            .pipe(first());
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

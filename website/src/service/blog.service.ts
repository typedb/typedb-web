import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransferStateService } from "@scullyio/ng-lib";
import { first, Observable } from "rxjs";
import { WordpressPost, WordpressPostClassifier, WordpressPosts, WordpressSite } from "typedb-web-schema";

const siteApiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com";
const postsApiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com/posts";
const searchApiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com/search";

@Injectable({
    providedIn: "root",
})
export class BlogService {
    readonly site$: Observable<WordpressSite>;
    readonly posts$: Observable<WordpressPosts>;

    constructor(private _http: HttpClient, private transferState: TransferStateService) {
        this.site$ = this.transferState
            .useScullyTransferState("blogSite", this._http.get<WordpressSite>(siteApiUrl))
            .pipe(first());
        this.posts$ = this.transferState
            .useScullyTransferState("blogPosts", this._http.get<WordpressPosts>(postsApiUrl))
            .pipe(first());
    }

    getPostBySlug(slug: string): Observable<WordpressPost> {
        return this._http.get<WordpressPost>(`${postsApiUrl}/slug:${slug}`);
    }

    getPostsByTag(tag: WordpressPostClassifier): Observable<WordpressPosts> {
        return this._http.get<WordpressPosts>(`${postsApiUrl}?tag=${tag.slug}`);
    }
}

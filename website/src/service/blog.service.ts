import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WordpressPosts, WordpressSite } from "typedb-web-schema";

const siteApiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com";
const postsApiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com/posts";

@Injectable({
    providedIn: "root",
})
export class BlogService {
    readonly site$: Observable<WordpressSite>;
    readonly posts$: Observable<WordpressPosts>;

    constructor(private _http: HttpClient) {
        this.site$ = this._http.get<WordpressSite>(siteApiUrl);
        this.posts$ = this._http.get<WordpressPosts>(postsApiUrl);
    }
}

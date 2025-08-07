import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { map, Observable } from "rxjs";
import { WordpressPost, WordpressPosts } from "typedb-web-schema";

const postsApiUrl = `https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com/posts`;

@Injectable({
    providedIn: "root",
})
export class WordpressService {
    constructor(private http: HttpClient) {}

    // TODO: currently this is the first 100 posts - add ability to get more
    listPosts(limit = 100, offset = 0): Observable<WordpressPost[]> {
        return this.http
            .get<WordpressPosts>(`${postsApiUrl}?meta=sharing-buttons&number=${limit}&offset=${offset}`)
            .pipe(map((res) => res.posts));
    }
}

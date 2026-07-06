import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { EMPTY, expand, map, Observable, reduce } from "rxjs";
import { WordpressPost } from "typedb-web-schema";

const postsApiUrl = `https://public-api.wordpress.com/wp/v2/sites/typedb.wordpress.com/posts`;

// The WordPress REST API caps per_page at 100, so fetching everything requires pagination
const pageSize = 100;

interface WPV2Post {
    id: number;
    slug: string;
    content: { rendered: string };
}

@Injectable({
    providedIn: "root",
})
export class WordpressService {
    constructor(private http: HttpClient) {}

    listPosts(): Observable<WordpressPost[]> {
        return this.fetchPage(0).pipe(
            expand((page, index) => (page.length === pageSize ? this.fetchPage((index + 1) * pageSize) : EMPTY)),
            reduce((posts, page) => posts.concat(page), [] as WordpressPost[]),
            map((posts) => {
                if (posts.length === 0) throw new Error("No posts found");
                return posts;
            }),
        );
    }

    private fetchPage(offset: number): Observable<WordpressPost[]> {
        return this.http
            .get<WPV2Post[]>(`${postsApiUrl}?per_page=${pageSize}&offset=${offset}&_fields=id,slug,content`)
            .pipe(map((posts) => posts.map((post) => ({ ID: post.id, slug: post.slug, content: post.content.rendered }))));
    }
}

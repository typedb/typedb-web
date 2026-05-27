import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { map, Observable } from "rxjs";
import { WordpressPost } from "typedb-web-schema";

const postsApiUrl = `https://public-api.wordpress.com/wp/v2/sites/typedb.wordpress.com/posts`;

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

    // TODO: currently this is the first 100 posts - add ability to get more
    listPosts(limit = 100, offset = 0): Observable<WordpressPost[]> {
        return this.http
            .get<WPV2Post[]>(`${postsApiUrl}?per_page=${limit}&offset=${offset}`)
            .pipe(
                map((posts) => {
                    if (posts.length === 0) throw new Error('No posts found');
                    return posts.map((post) => ({ ID: post.id, slug: post.slug, content: post.content.rendered }));
                })
            );
    }
}

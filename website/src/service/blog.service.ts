import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { TransferStateService } from "@scullyio/ng-lib";
import { BehaviorSubject, combineLatest, concat, filter, iif, map, Observable, of, shareReplay, switchMap } from "rxjs";
import { BlogCategoryID, BlogFilter, blogNullFilter, BlogPost, blogPostSchemaName, SanityBlogPost, WordpressPost, WordpressPosts } from "typedb-web-schema";
import { ContentService } from "./content.service";

const postsApiUrl = `https://public-api.wordpress.com/rest/v1.1/sites/typedb.wordpress.com/posts`;

@Injectable({
    providedIn: "root",
})
export class BlogService {
    readonly fetchedPosts: Observable<BlogPost[]>;
    readonly displayedPosts: Observable<BlogPost[]>;
    readonly filter = new BehaviorSubject<BlogFilter>(blogNullFilter());

    constructor(
        private _http: HttpClient,
        private contentService: ContentService,
        private transferState: TransferStateService,
    ) {
        // TODO: without this filter(), we get 'cannot read property of undefined' errors in production.
        //  We should figure out why this filter() fixes the issue, and if there is a better way
        this.fetchedPosts = this.transferState.useScullyTransferState("blogAllPosts", this.listPosts()).pipe(
            filter((data) => !!data?.length),
            shareReplay(),
        ); // TODO: currently this is only the first 100 posts - add ability to get more
        this.displayedPosts = combineLatest([this.fetchedPosts, this.filter]).pipe(
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

    private listWordpressPosts(limit = 100, offset = 0): Observable<WordpressPost[]> {
        return this._http
            .get<WordpressPosts>(`${postsApiUrl}?meta=sharing-buttons&number=${limit}&offset=${offset}`)
            .pipe(map((res) => res.posts));
    }

    private listPosts(limit = 100, offset = 0): Observable<BlogPost[]> {
        return combineLatest([this.contentService.data, this.listWordpressPosts(limit, offset)]).pipe(map(([data, wpPosts]) => {
            return data.getDocumentsByType<SanityBlogPost>(blogPostSchemaName)
                .map(sanityPost => [sanityPost, wpPosts.find(wpPost => wpPost.slug === sanityPost.slug.current)] as [SanityBlogPost, WordpressPost])
                .filter(([_sanityPost, wpPost]) => !!wpPost)
                .map(([sanityPost, wpPost]) => BlogPost.fromApi(sanityPost, data, wpPost));
        }));
    }

    getPostBySlug(slug: string): Observable<BlogPost> {
        return this.fetchedPosts.pipe(
            switchMap((posts) => {
                const post = posts.find((post) => post.slug === slug);
                return iif(
                    () => !!post,
                    concat(of(post as BlogPost), this.fetchPostBySlug(slug)),
                    this.fetchPostBySlug(slug),
                );
            }),
        );
    }

    private fetchPostBySlug(slug: string): Observable<BlogPost> {
        return combineLatest([this.contentService.data, this._http.get<WordpressPost>(`${postsApiUrl}/slug:${slug}`)]).pipe(
            map(([data, wpPost]) => {
                const sanityBlogPosts = data.getDocumentsByType<SanityBlogPost>(blogPostSchemaName);
                return BlogPost.fromApi(sanityBlogPosts.find(x => x.slug.current === slug)!, data, wpPost);
            }),
            shareReplay()
        );
    }

    getPostsByCategory(categorySlug: BlogCategoryID): Observable<BlogPost[]> {
        return this.fetchedPosts.pipe(map((posts) => posts.filter((post) => post.categories.includes(categorySlug))));
    }
}

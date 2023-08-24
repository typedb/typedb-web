import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {
    Link,
    WordpressPost,
    WordpressTaxonomy,
    WordpressPosts,
    WordpressRelatedPosts,
    WordpressSite,
} from "typedb-web-schema";
import { BlogService } from "../../service/blog.service";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { combineLatest, distinctUntilChanged, map, mergeMap, Observable, of, shareReplay, switchMap, tap } from "rxjs";

@Component({
    selector: "td-blog-post-page",
    templateUrl: "./blog-post-page.component.html",
    styleUrls: ["./blog-post-page.component.scss"],
})
export class BlogPostPageComponent {
    readonly site$: Observable<WordpressSite>;
    readonly post$: Observable<WordpressPost | null>;
    readonly categories$: Observable<WordpressTaxonomy[] | null>;
    relatedPostGroups$?: Observable<WordpressRelatedPosts | null>;

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private contentService: ContentService,
        private blogService: BlogService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {
        this.site$ = this.blogService.site;
        this.post$ = this._activatedRoute.paramMap.pipe(
            map((params: ParamMap) => params.get("slug")),
            switchMap((slug: string | null) => {
                return slug ? this.blogService.getPostBySlug(slug) : of(null);
            }),
            shareReplay(),
        );
        this.categories$ = this.post$.pipe(map((post) => (post ? Object.values(post.categories) : null)));
        this.relatedPostGroups$ = combineLatest([this.post$, this.categories$]).pipe(
            switchMap(([post, categories]) => {
                if (!post || !categories) return of(null);
                return combineLatest(
                    categories.map((category) => {
                        return this.blogService
                            .getPostsByCategory(category)
                            .pipe(map((posts) => ({ category: category, posts: posts.filter((p) => p.slug !== post.slug).slice(0, 3) })));
                    }),
                );
            }),
        );
    }

    ngOnInit() {
        combineLatest([this.post$, this.site$]).subscribe(
            ([post, site]) => {
                if (post) {
                    this._title.setTitle(`${post.title} - ${site.name}`);
                    this._analytics.hubspot.trackPageView();
                } else {
                    this.router.navigate(["404"], { skipLocationChange: true });
                }
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 10000);
            },
            (_err) => {
                this.router.navigate(["404"], { skipLocationChange: true });
            },
        );
    }

    postCategories(post: WordpressPost): WordpressTaxonomy[] {
        return Object.values(post.categories);
    }

    readPostLink(post: WordpressPost): Link {
        return new Link({ type: "route", destination: `blog/${post.slug}`, opensNewTab: false });
    }
}

import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Link, WordpressPost, WordpressPostClassifier, WordpressPosts, WordpressRelatedPosts } from "typedb-web-schema";
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
    readonly post$: Observable<WordpressPost | null>;
    readonly tags$: Observable<WordpressPostClassifier[] | null>;
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
        this.post$ = this._activatedRoute.paramMap.pipe(
            map((params: ParamMap) => params.get("slug")),
            switchMap((slug: string | null) => {
                return slug ? this.blogService.getPostBySlug(slug) : of(null);
            }),
            shareReplay()
        );
        this.tags$ = this.post$.pipe(map((post) => post ? Object.values(post.tags) : null));
        this.relatedPostGroups$ = this.tags$.pipe(
            switchMap((tags) => {
                if (!tags) return of(null);
                return combineLatest(
                    tags.map((tag) => {
                        return this.blogService.getPostsByTag(tag).pipe(
                            map((result) => ({ tag: tag, posts: result.posts }))
                        )
                    })
                );
            })
        );
    }

    ngOnInit() {
        combineLatest([this.post$, this.blogService.site$]).subscribe(([post, site]) => {
            if (post) {
                this._title.setTitle(`${post.title} - ${site.name}`);
                this._analytics.hubspot.trackPageView();
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
            setTimeout(() => {
                this._idleMonitor.fireManualMyAppReadyEvent();
            }, 10000);
        }, (_err) => {
            this.router.navigate(["404"], { skipLocationChange: true });
        });
    }

    postCategoriesString(post: WordpressPost): string {
        return Object.keys(post.categories).join(", ");
    }

    readPostLink(post: WordpressPost): Link {
        return new Link({ type: "route", destination: `blog/${post.slug}`, opensNewTab: false });
    }
}

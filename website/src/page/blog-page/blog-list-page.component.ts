import { Component, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { BlogFilter, Link, WordpressPost, WordpressTaxonomy, blogNullFilter } from "typedb-web-schema";
import { BlogService } from "../../service/blog.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { combineLatest, map, Observable } from "rxjs";

@Component({
    selector: "td-blog-list-page",
    templateUrl: "./blog-list-page.component.html",
    styleUrls: ["./blog-list-page.component.scss"],
})
export class BlogListPageComponent implements OnInit {
    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private blogService: BlogService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {
        this._route.paramMap
            .pipe(
                takeUntilDestroyed(),
                map((params) => {
                    const categorySlug = params.get("categorySlug");
                    if (categorySlug) return { categorySlug };
                    return blogNullFilter();
                }),
            )
            .subscribe((filter) => {
                this.blogService.filter$.next(filter);
            });
    }

    ngOnInit() {
        this.site$.subscribe(
            (site) => {
                this._title.setTitle(site.name);
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 10000);
            },
            (_err) => {
                this.router.navigate(["404"], { skipLocationChange: true });
            },
        );
    }

    get site$() {
        return this.blogService.site$;
    }

    get posts$() {
        return this.blogService.currentPosts$;
    }

    get filter$() {
        return this.blogService.filter$;
    }

    readPostLink(post: WordpressPost): Link {
        return new Link({ type: "route", destination: `blog/${post.slug}`, opensNewTab: false });
    }

    postCategories(post: WordpressPost): WordpressTaxonomy[] {
        return Object.values(post.categories);
    }
}

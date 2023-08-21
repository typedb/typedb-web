import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { BlogFilter, Link, WordpressPost, WordpressTaxonomy, WordpressSite } from "typedb-web-schema";
import { BlogService } from "../../service/blog.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { map, Observable, switchMap } from "rxjs";

@Component({
    selector: "td-blog-list-page",
    templateUrl: "./blog-list-page.component.html",
    styleUrls: ["./blog-list-page.component.scss"],
})
export class BlogListPageComponent implements OnInit {
    site$: Observable<WordpressSite>;
    posts$: Observable<WordpressPost[]>;
    filter$: Observable<BlogFilter | null>;

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private blogService: BlogService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {
        this.site$ = this.blogService.site$;
        this.filter$ = this._route.paramMap.pipe(
            map((params) => {
                const categorySlug = params.get("categorySlug");
                if (categorySlug) return { categorySlug };
                return null;
            }),
        );
        this.posts$ = this.filter$.pipe(
            switchMap((filter) => {
                return this.blogService.posts$.pipe(
                    map((res) => res.posts.sort((a, b) => a.menu_order - b.menu_order)),
                );
            }),
        );
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

    readPostLink(post: WordpressPost): Link {
        return new Link({ type: "route", destination: `blog/${post.slug}`, opensNewTab: false });
    }

    postCategories(post: WordpressPost): WordpressTaxonomy[] {
        return Object.values(post.categories);
    }
}

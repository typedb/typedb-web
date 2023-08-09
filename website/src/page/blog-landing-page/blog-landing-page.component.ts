import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Link, WordpressPost, WordpressSite } from "typedb-web-schema";
import { BlogService } from "../../service/blog.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { map, Observable } from "rxjs";

@Component({
    selector: "td-blog-landing-page",
    templateUrl: "./blog-landing-page.component.html",
    styleUrls: ["./blog-landing-page.component.scss"],
})
export class BlogLandingPageComponent implements OnInit {
    site$: Observable<WordpressSite>;
    posts$: Observable<WordpressPost[]>;

    constructor(
        private router: Router,
        private blogService: BlogService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {
        this.site$ = this.blogService.site$;
        this.posts$ = this.blogService.posts$.pipe(map((res) => res.posts.sort((a, b) => a.menu_order - b.menu_order)));
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

    postCategoriesString(post: WordpressPost): string {
        return Object.keys(post.categories).join(", ");
    }
}

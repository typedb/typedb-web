import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonStyle, LinkButton, SanityWhitePapersPage, WhitePaper, WhitePapersPage, whitePapersPageSchemaName, WordpressPost, WordpressPosts, WordpressSite } from "typedb-web-schema";
import { BlogService } from "../../service/blog.service";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { map, Observable, Subscription } from "rxjs";

@Component({
    selector: "td-blog-landing-page",
    templateUrl: "./blog-landing-page.component.html",
    styleUrls: ["./blog-landing-page.component.scss"]
})
export class BlogLandingPageComponent {
    site$?: Observable<WordpressSite>;
    posts$?: Observable<WordpressPost[]>;

    constructor(private router: Router, private contentService: ContentService, private blogService: BlogService, private _title: Title, private _analytics: AnalyticsService, private _idleMonitor: IdleMonitorService) {
        this.site$ = this.blogService.site$;
        this.posts$ = this.blogService.posts$.pipe(map((res) => res.posts.sort((a, b) => a.menu_order - b.menu_order)));
    }
}

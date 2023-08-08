import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { WordpressPost } from "typedb-web-schema";
import { BlogService } from "../../service/blog.service";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { Observable } from "rxjs";

@Component({
    selector: "td-blog-post-page",
    templateUrl: "./blog-post-page.component.html",
    styleUrls: ["./blog-post-page.component.scss"],
})
export class BlogPostPageComponent {
    post$?: Observable<WordpressPost>;

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private contentService: ContentService,
        private blogService: BlogService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const slug = params.get("slug");
            this.post$ = slug ? this.blogService.getPostBySlug(slug) : undefined;
        });
    }
}

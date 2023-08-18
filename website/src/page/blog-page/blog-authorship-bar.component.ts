import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { BlogFilter, Link, WordpressPost, WordpressPostClassifier, WordpressSite } from "typedb-web-schema";
import { BlogService } from "../../service/blog.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { map, Observable, switchMap } from "rxjs";

@Component({
    selector: "td-blog-authorship-bar",
    templateUrl: "./blog-authorship-bar.component.html",
    styleUrls: ["./blog-authorship-bar.component.scss"],
})
export class BlogAuthorshipBarComponent {
    @Input() post!: WordpressPost;
    @Input() size: "medium" | "small" = "small";

    @HostBinding("class.bp-author-small") get isSmall() {
        return this.size === "small";
    }
}

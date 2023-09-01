import { Component, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { Link, WordpressPost, WordpressTaxonomy, blogNullFilter } from "typedb-web-schema";
import { BlogService } from "../../service/blog.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { map } from "rxjs";

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
                this.blogService.filter.next(filter);
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
        return this.blogService.site;
    }

    get posts$() {
        return this.blogService.displayedPosts;
    }

    get filter$() {
        return this.blogService.filter;
    }

    readPostLink(post: WordpressPost): Link {
        return new Link({ type: "route", destination: `blog/${post.slug}`, opensNewTab: false });
    }

    postCategories(post: WordpressPost): WordpressTaxonomy[] {
        return Object.values(post.categories);
    }

    heroImageURL(post: WordpressPost): string {
        if (post.featured_image) return post.featured_image;
        switch (post.slug.length % 3) {
            case 0:
                return "/assets/graphic/blog-placeholder-image-0.svg";
            case 1:
                return "/assets/graphic/blog-placeholder-image-1.svg";
            case 2:
            default:
                return "/assets/graphic/blog-placeholder-image-2.webp";
        }
    }
}

import { Component, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { combineLatest, map } from "rxjs";
import { blogNullFilter, Link, WordpressPost, WordpressTaxonomy } from "typedb-web-schema";

import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";

import { AnalyticsService } from "../../service/analytics.service";
import { BlogService } from "../../service/blog.service";

@Component({
    selector: "td-blog-list-page",
    templateUrl: "./blog-list-page.component.html",
    styleUrls: ["./blog-list-page.component.scss"],
})
export class BlogListPageComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private blogService: BlogService,
        private title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
        destroyRef: DestroyRef,
        topbarMenuService: TopbarMenuService,
    ) {
        topbarMenuService.registerPageOffset(100, destroyRef);
        combineLatest([this.site$, this.categories$])
            .pipe(takeUntilDestroyed())
            .subscribe(
                ([_site, categories]) => {
                    this.route.paramMap
                        .pipe(
                            map((params) => {
                                const categorySlug = params.get("categorySlug");
                                if (categorySlug) return { categorySlug };
                                else return blogNullFilter();
                            }),
                        )
                        .subscribe((filter) => {
                            this.blogService.filter.next(filter);
                            if ("categorySlug" in filter) {
                                const category = categories.find((x) => x.slug === filter.categorySlug);
                                if (!category) throw `Unknown category slug: ${filter.categorySlug}`;
                                this.title.setTitle(`TypeDB | Blog > ${category.name}`);
                            } else {
                                this.title.setTitle(`TypeDB | Blog`);
                            }
                        });
                    this._analytics.hubspot.trackPageView();
                    setTimeout(() => {
                        this._idleMonitor.fireManualMyAppReadyEvent();
                    }, 20000);
                },
                (_err) => {
                    this.router.navigate(["404"], { skipLocationChange: true });
                },
            );
    }

    get site$() {
        return this.blogService.site;
    }

    get categories$() {
        return this.blogService.categories;
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

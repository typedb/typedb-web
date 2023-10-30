import { Component, DestroyRef } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { combineLatest, map, Observable } from "rxjs";
import { Blog, blogCategories, BlogCategoryID, blogCategoryList, blogNullFilter, BlogPost, BlogPostsRow, BlogRow, blogSchemaName, SanityBlog } from "typedb-web-schema";
import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";
import { AnalyticsService } from "../../service/analytics.service";
import { BlogService } from "../../service/blog.service";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";

@Component({
    selector: "td-blog-list-page",
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.scss"],
})
export class BlogComponent {
    blog?: Blog;
    rows: BlogRow[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private contentService: ContentService,
        private blogService: BlogService,
        private title: Title,
        private metaTags: MetaTagsService,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
        destroyRef: DestroyRef,
        topbarMenuService: TopbarMenuService,
    ) {
        topbarMenuService.registerPageOffset(100, destroyRef);
        this.contentService.data.subscribe((data) => {
            const sanityBlog = data.getDocumentByID<SanityBlog>(blogSchemaName);
            if (sanityBlog) {
                this.blog = new Blog(sanityBlog, data);
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
                        let categorySlug: "all" | BlogCategoryID = "all";
                        if ("categorySlug" in filter) {
                            categorySlug = filter.categorySlug as BlogCategoryID;
                            if (!blogCategoryList.includes(categorySlug)) throw `Unknown category slug: ${categorySlug}`;
                            this.title.setTitle(`TypeDB | ${this.blog!.title} > ${blogCategories[categorySlug]}`);
                        } else {
                            this.title.setTitle(`TypeDB | ${this.blog!.title}`);
                        }
                        this.metaTags.register(this.blog!.tabs[categorySlug].metaTags);
                        this._analytics.hubspot.trackPageView();
                    }, (_err) => {
                        this.router.navigate(["404"], { skipLocationChange: true });
                    });
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 20000);
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
        });
    }

    get posts$() {
        return this.blogService.displayedPosts;
    }

    get rows$(): Observable<BlogRow[]> {
        return combineLatest([this.posts$, this.blogService.filter]).pipe(
            map(([posts, filter]) => {
                const rows = [];
                // TODO: additional rows
                for (let i = 0; i < posts.length; i++) {
                    if (i === 0 || posts[i].level === "primary") {
                        rows.push(new BlogPostsRow({ level: "primary", posts: [posts[i]] }));
                    } else if (posts[i].level === "tertiary" || i === posts.length - 1) {
                        rows.push(new BlogPostsRow({ level: "tertiary", posts: [posts[i]] }));
                    } else {
                        rows.push(new BlogPostsRow({ level: "secondary", posts: [posts[i], posts[i + 1]]}));
                        i++;
                    }
                }
                return rows;
            }),
        );
    }

    heroImageURL(post: BlogPost): string {
        if (post.imageURL) return post.imageURL;
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

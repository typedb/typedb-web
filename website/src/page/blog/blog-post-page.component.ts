import { Component, DestroyRef, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { combineLatest, map, Observable, of, shareReplay, switchMap } from "rxjs";
import {
    Blog,
    blogCategories,
    BlogCategoryID,
    BlogPost,
    blogPostLinkOf,
    blogPostSchemaName,
    blogSchemaName,
    Link,
    LinkButton,
    RelatedBlogPosts,
    SanityBlog,
} from "typedb-web-schema";

import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";

import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";
import { WordpressService } from "../../service/wordpress.service";

@Component({
    selector: "td-blog-post-page",
    templateUrl: "./blog-post-page.component.html",
    styleUrls: ["./blog-post-page.component.scss"],
})
export class BlogPostPageComponent implements OnInit {
    blog?: Blog;
    readonly post$: Observable<BlogPost | null>;
    readonly categories$: Observable<BlogCategoryID[] | null>;
    relatedPostGroups$?: Observable<RelatedBlogPosts | null>;
    readonly subscribeToNewsletterButton = new LinkButton({
        style: "secondary",
        link: Link.fromAddress("?dialog=newsletter"),
        text: "Subscribe to Newsletter",
        comingSoon: false,
    });

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private contentService: ContentService,
        private blogService: WordpressService,
        private metaTags: MetaTagsService,
        private title: Title,
        private meta: Meta,
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
            }
        });
        this.post$ = this._activatedRoute.paramMap.pipe(
            map((params: ParamMap) => params.get("slug")),
            switchMap((slug: string | null) => {
                return slug
                    ? this.blogService.getArticleBySlug<BlogPost>(this.blogService.blogPosts, blogPostSchemaName, slug)
                    : of(null);
            }),
            shareReplay(1),
        );
        this.categories$ = this.post$.pipe(map((post) => (post ? post.categories : null)));
        this.relatedPostGroups$ = this.post$.pipe(
            switchMap((post) => {
                if (!post) return of(null);
                return combineLatest(
                    post.categories.map((category) => {
                        return this.blogService.getPostsByCategory(category).pipe(
                            map((posts) => ({
                                categorySlug: category,
                                posts: posts
                                    .filter((p) => p.slug !== post.slug)
                                    .slice(0, 3)
                                    .map((x) => blogPostLinkOf(x)),
                            })),
                        );
                    }),
                );
            }),
        );
    }

    ngOnInit() {
        this.post$.subscribe(
            (post) => {
                if (post) {
                    this.title.setTitle(post.pageTitle());
                    this.metaTags.register(post.metaTags);
                    this._analytics.hubspot.trackPageView();
                    Prism.highlightAll();
                } else {
                    this.router.navigate(["blog"]);
                }
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 20000);
            },
            (_err) => {
                this.router.navigate(["blog"]);
            },
        );
    }

    categoryDisplayName(category: BlogCategoryID) {
        return blogCategories[category];
    }

    shareOnTwitterURL(post: BlogPost): string {
        return `https://twitter.com/intent/tweet?text=${post.title.toPlainText()}&url=${encodeURIComponent(
            window.location.href,
        )}`;
    }

    shareOnFacebookURL(post: BlogPost): string {
        return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
            window.location.href,
        )}&t=${post.title.toPlainText()}`;
    }

    shareOnLinkedInURL(_post: BlogPost): string {
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    }

    shareOnRedditURL(post: BlogPost): string {
        return `https://www.reddit.com/submit?url=${encodeURIComponent(
            window.location.href,
        )}&title=${post.title.toPlainText()}`;
    }
}

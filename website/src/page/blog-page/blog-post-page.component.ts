import { Component, DestroyRef, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { combineLatest, map, Observable, of, shareReplay, switchMap } from "rxjs";
import {
    Link,
    LinkButton,
    WordpressACF,
    WordpressPost,
    WordpressRelatedPosts,
    WordpressSite,
    WordpressTaxonomy,
} from "typedb-web-schema";

import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";

import { AnalyticsService } from "../../service/analytics.service";
import { BlogService } from "../../service/blog.service";

@Component({
    selector: "td-blog-post-page",
    templateUrl: "./blog-post-page.component.html",
    styleUrls: ["./blog-post-page.component.scss"],
})
export class BlogPostPageComponent implements OnInit {
    readonly site$: Observable<WordpressSite>;
    readonly post$: Observable<WordpressPost | null>;
    readonly customFields$: Observable<WordpressACF | null>;
    readonly categories$: Observable<WordpressTaxonomy[] | null>;
    relatedPostGroups$?: Observable<WordpressRelatedPosts | null>;
    readonly subscribeToNewsletterButton = new LinkButton({
        style: "secondary",
        link: Link.fromAddress("?dialog=newsletter"),
        text: "Subscribe to Newsletter",
        comingSoon: false,
    });

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private blogService: BlogService,
        private title: Title,
        private meta: Meta,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
        destroyRef: DestroyRef,
        topbarMenuService: TopbarMenuService,
    ) {
        topbarMenuService.registerPageOffset(100, destroyRef);
        this.site$ = this.blogService.site;
        this.post$ = this._activatedRoute.paramMap.pipe(
            map((params: ParamMap) => params.get("slug")),
            switchMap((slug: string | null) => {
                return slug ? this.blogService.getPostBySlug(slug) : of(null);
            }),
            shareReplay(1),
        );
        this.categories$ = this.post$.pipe(map((post) => (post ? Object.values(post.categories) : null)));
        this.customFields$ = this.post$.pipe(
            switchMap((post) => (post ? this.blogService.getCustomFieldsForPost(post) : of(null))),
        );
        this.relatedPostGroups$ = combineLatest([this.post$, this.categories$]).pipe(
            switchMap(([post, categories]) => {
                if (!post || !categories) return of(null);
                return combineLatest(
                    categories.map((category) => {
                        return this.blogService.getPostsByCategory(category).pipe(
                            map((posts) => ({
                                category: category,
                                posts: posts.filter((p) => p.slug !== post.slug).slice(0, 3),
                            })),
                        );
                    }),
                );
            }),
        );
    }

    ngOnInit() {
        combineLatest([this.post$, this.customFields$, this.site$]).subscribe(
            ([post, customFields, site]) => {
                if (post && customFields) {
                    this.title.setTitle(`TypeDB | Blog > ${post.title}`);
                    this.meta.addTag({
                        property: "og:description",
                        content: customFields.social_sharing_description || "",
                    });
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

    postCategories(post: WordpressPost): WordpressTaxonomy[] {
        return Object.values(post.categories);
    }

    readPostLink(post: WordpressPost): Link {
        return new Link({ type: "route", destination: `blog/${post.slug}`, opensNewTab: false });
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

    shareOnTwitterURL(post: WordpressPost): string {
        return `https://twitter.com/intent/tweet?text=${post.title}&url=${encodeURIComponent(window.location.href)}`;
    }

    shareOnFacebookURL(post: WordpressPost): string {
        return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}&t=${post.title}`;
    }

    shareOnLinkedInURL(_post: WordpressPost): string {
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    }

    shareOnRedditURL(post: WordpressPost): string {
        return `https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${post.title}`;
    }
}

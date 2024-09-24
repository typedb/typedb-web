import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { combineLatest, map, Observable, of, shareReplay, switchMap } from "rxjs";
import {
    Article, Blog, blogCategories, BlogCategoryID, BlogPost, blogPostLinkOf, blogPostSchemaName, blogSchemaName,
    Link, LinkButton, RelatedBlogPosts, SanityBlog,
} from "typedb-web-schema";

import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";
import { CanonicalLinkService } from "src/service/canonical-link.service";

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../../framework/button/button.component";
import { FurtherLearningComponent } from "../../framework/further-learning/further-learning.component";
import { LinkDirective } from "../../framework/link/link.directive";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { sanitiseHtmlID } from "../../framework/util";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";
import { BlogAuthorshipBarComponent } from "./blog-authorship-bar.component";
import { BlogCategoryChipsComponent } from "./blog-category-chips.component";
import { BlogNavbarComponent } from "./blog-navbar.component";

@Component({
    selector: "td-blog-post-page",
    templateUrl: "./blog-post-page.component.html",
    styleUrls: ["./blog-post-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, LinkDirective, HeadingWithHighlightsComponent, BlogNavbarComponent,
        BlogCategoryChipsComponent, RichTextComponent, BlogAuthorshipBarComponent, MatIconModule,
        ButtonComponent, AspectRatioComponent, FurtherLearningComponent, AsyncPipe
    ],
})
export class BlogPostPageComponent implements OnInit {
    readonly blog$: Observable<Blog | null>;
    readonly post$: Observable<BlogPost | null>;
    readonly categories$: Observable<BlogCategoryID[] | null>;
    readonly relatedPostGroups$?: Observable<RelatedBlogPosts | null>;
    readonly subscribeToNewsletterButton = new LinkButton({
        style: "secondary",
        link: Link.fromAddress("?dialog=newsletter"),
        text: "Subscribe to Newsletter",
        comingSoon: false,
    });

    constructor(
        private canonicalLink: CanonicalLinkService, private router: Router, private _activatedRoute: ActivatedRoute,
        private content: ContentService, private metaTags: MetaTagsService, private title: Title,
        private _idleMonitor: IdleMonitorService, destroyRef: DestroyRef, topbarMenuService: TopbarMenuService,
    ) {
        topbarMenuService.registerPageOffset(100, destroyRef);
        this.blog$ = this.content.data.pipe(
            map((data) => {
                const sanityBlog = data.getDocumentByID<SanityBlog>(blogSchemaName);
                return sanityBlog ? new Blog(sanityBlog, data) : null;
            }),
        );
        this.post$ = this._activatedRoute.paramMap.pipe(
            map((params: ParamMap) => params.get("slug")),
            switchMap((slug: string | null) =>
                slug
                    ? this.content.getArticleBySlug<BlogPost>(this.content.blogPosts, blogPostSchemaName, slug)
                    : of(null),
            ),
            shareReplay(1),
        );
        this.categories$ = this.post$.pipe(map((post) => (post ? post.categories : null)));
        this.relatedPostGroups$ = this.post$.pipe(
            switchMap((post) => {
                if (!post) return of(null);
                return combineLatest(
                    post.categories.map((category) => {
                        return this.content.getPostsByCategory(category).pipe(
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
        this.post$.subscribe({
            next: (post) => {
                if (post) {
                    this.title.setTitle(post.pageTitle());
                    this.metaTags.register(post.metaTags);
                    setTimeout(() => {
                        this.decoratePost();
                    }, 0);
                    if (post.canonicalUrl) {
                        this.canonicalLink.setCanonical(post.canonicalUrl);
                    }
                } else {
                    this.router.navigate(["blog"], { replaceUrl: true });
                }
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 60000);
            },
            error: (_err) => {
                this.router.navigate(["blog"], { replaceUrl: true });
            },
        });
    }

    private decoratePost() {
        Prism.highlightAll();
        document.querySelectorAll("article a[rel*='noreferrer']").forEach((el) => {
            el.setAttribute("rel", "noopener");
        });
        let anchorIndex = 0;
        document.querySelectorAll("article h2:not([id]), article h3:not([id]), article h4:not([id]), article h5:not([id]), article h6:not([id])").forEach((el) => {
            const sectionID = `${sanitiseHtmlID(el.textContent || "section")}-${anchorIndex}`;
            el.id = sectionID;
            const anchorEl = document.createElement("a");
            anchorEl.classList.add("anchor");
            anchorEl.href = `${window.location.origin}${window.location.pathname}#${sectionID}`;
            el.appendChild(anchorEl);
            anchorIndex++;
        });
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

    subscribeNewsletterLinkId(post: Article): string {
        return sanitiseHtmlID(`${post.title.toSectionID()}_subscribe-to-newsletter`);
    }
}

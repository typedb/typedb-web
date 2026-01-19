import { AsyncPipe, isPlatformBrowser } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, DOCUMENT, inject, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import Prism from "prismjs";
import { combineLatest, map, Observable, of, shareReplay, switchMap } from "rxjs";
import { sanitiseHtmlID } from "typedb-web-common/lib";
import {
    Article, blogCategories, BlogCategoryID, fundamentalArticleSchemaName, ResourceHub,
    learningCenterSchemaName, Link, LinkButton, SanityResourceHub, fundamentalsPageSchemaName,
    ActionButton,
} from "typedb-web-schema";

import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";
import { CanonicalLinkService } from "src/service/canonical-link.service";

import { ButtonComponent } from "../../framework/button/button.component";
import { FurtherLearningComponent } from "../../framework/further-learning/further-learning.component";
import { LinkDirective } from "../../framework/link/link.directive";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";
import { portableTextToPlainText } from "../../service/portable-text-utils";
import { DialogService } from "src/service/dialog.service";

@Component({
    selector: "td-learning-article",
    templateUrl: "./learning-article.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        LinkDirective, HeadingWithHighlightsComponent, RichTextComponent,
        MatIconModule, ButtonComponent, FurtherLearningComponent, AsyncPipe
    ]
})
export class LearningArticleComponent implements OnInit {
    private readonly platformId = Inject(PLATFORM_ID);
    article$!: Observable<Article | null>;
    resourceHub$!: Observable<ResourceHub | null>;
    resourceHubLink$!: Observable<string>;
    dialog = inject(DialogService);

    readonly subscribeToNewsletterButton = new ActionButton({
        id: "subscribe-to-newsletter",
        style: "greenHollow",
        onClick: () => this.dialog.openNewsletterDialog(),
        text: "Subscribe to newsletter",
        comingSoon: false,
    });

    constructor(
        private canonicalLink: CanonicalLinkService, private router: Router, private activatedRoute: ActivatedRoute,
        private content: ContentService, private metaTags: MetaTagsService, private title: Title,
        destroyRef: DestroyRef, topbarMenuService: TopbarMenuService, @Inject(DOCUMENT) private doc: Document,
    ) {
        topbarMenuService.registerPageOffset(100, destroyRef);
    }

    ngOnInit() {
        this.resourceHub$ = combineLatest([this.activatedRoute.data, this.content.data]).pipe(
            map(([routeData, db]) => {
                let resourceHubSchemaName: string;
                if (routeData["resourceType"] === fundamentalArticleSchemaName) resourceHubSchemaName = fundamentalsPageSchemaName;
                else resourceHubSchemaName = learningCenterSchemaName;
                const sanityResourceHub = db.getDocumentByID<SanityResourceHub>(resourceHubSchemaName);
                return sanityResourceHub ? new ResourceHub(sanityResourceHub, db) : null;
            }),
        );
        this.resourceHubLink$ = this.activatedRoute.data.pipe(
            map((routeData) => {
                if (routeData["resourceType"] === fundamentalArticleSchemaName) return "/fundamentals";
                else return "/learn";
            })
        );
        this.article$ = combineLatest([this.activatedRoute.data, this.activatedRoute.paramMap]).pipe(
            map(([routeData, params]) => ({ resourceType: routeData["resourceType"], slug: params.get("slug") })),
            switchMap(({ resourceType, slug }) => {
                const articleStream =
                    resourceType === fundamentalArticleSchemaName
                        ? this.content.fundamentalArticles
                        : this.content.applicationArticles;
                return slug ? this.content.getArticleBySlug(articleStream, resourceType, slug) : of(null);
            }),
            shareReplay(),
        );
        this.article$.subscribe({
            next: (post) => {
                if (post) {
                    this.title.setTitle(post.pageTitle());
                    this.metaTags.register(post.metaTags, this.getMetaTagFallbacks(post));
                    if (isPlatformBrowser(this.platformId)) {
                        setTimeout(() => {
                            this.decoratePost();
                        }, 0);
                    }
                    if (post.canonicalUrl) {
                        this.canonicalLink.setCanonical(post.canonicalUrl);
                    }
                } else {
                    this.content.handleContentNotFound();
                }
            },
            error: (_err) => {
                this.content.handleContentNotFound();
            },
        });
    }

    private getMetaTagFallbacks(article: Article) {
        const description = this.extractDescription(article.contentHtml, 160);

        return {
            title: article.pageTitle(),
            description: description || article.shortDescription,
            ogImage: article.imageURL,
            ogType: "article" as const,
        };
    }

    private extractDescription(html: string, maxLength: number): string {
        const tempDiv = this.doc.createElement("div");
        tempDiv.innerHTML = html;
        const text = tempDiv.textContent || tempDiv.innerText || "";
        const trimmed = text.trim().replace(/\s+/g, " ");
        return trimmed.length > maxLength ? trimmed.substring(0, maxLength) + "..." : trimmed;
    }

    private decoratePost() {
        (window as any)["Prism"].highlightAll();
        this.doc.querySelectorAll("article a[rel*='noreferrer']").forEach((el) => {
            el.setAttribute("rel", "noopener");
        });
        let anchorIndex = 0;
        this.doc.querySelectorAll("article h2:not([id]), article h3:not([id]), article h4:not([id]), article h5:not([id]), article h6:not([id])").forEach((el) => {
            const sectionID = `${sanitiseHtmlID(el.textContent || "section")}-${anchorIndex}`;
            el.id = sectionID;
            const anchorEl = this.doc.createElement("a");
            anchorEl.classList.add("anchor");
            anchorEl.href = `${window.location.origin}${window.location.pathname}#${sectionID}`;
            el.appendChild(anchorEl);
            anchorIndex++;
        });
    }

    categoryDisplayName(category: BlogCategoryID) {
        return blogCategories[category];
    }

    shareOnTwitterURL(post: Article): string {
        return `https://twitter.com/intent/tweet?text=${post.title.toPlainText()}&url=${encodeURIComponent(
            this.doc.location.href,
        )}`;
    }

    shareOnFacebookURL(post: Article): string {
        return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
            this.doc.location.href,
        )}&t=${post.title.toPlainText()}`;
    }

    shareOnLinkedInURL(_post: Article): string {
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.doc.location.href)}`;
    }

    shareOnRedditURL(post: Article): string {
        return `https://www.reddit.com/submit?url=${encodeURIComponent(
            this.doc.location.href,
        )}&title=${post.title.toPlainText()}`;
    }

    subscribeNewsletterLinkId(post: Article): string {
        return sanitiseHtmlID(`${post.title.toSectionID()}_subscribe-to-newsletter`);
    }
}

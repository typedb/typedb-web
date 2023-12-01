import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { combineLatest, map, Observable, of, shareReplay, switchMap } from "rxjs";
import {
    Article,
    blogCategories,
    BlogCategoryID,
    fundamentalArticleSchemaName,
    LearningCenter,
    learningCenterSchemaName,
    Link,
    LinkButton,
    SanityLearningCenter,
} from "typedb-web-schema";

import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";

import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";

@Component({
    selector: "td-learning-article",
    templateUrl: "./learning-article.component.html",
    styleUrls: ["./learning-article.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningArticleComponent implements OnInit {
    article$!: Observable<Article | null>;
    learningCenter$!: Observable<LearningCenter | null>;

    readonly subscribeToNewsletterButton = new LinkButton({
        style: "secondary",
        link: Link.fromAddress("?dialog=newsletter"),
        text: "Subscribe to Newsletter",
        comingSoon: false,
    });

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private content: ContentService,
        private metaTags: MetaTagsService,
        private title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
        destroyRef: DestroyRef,
        topbarMenuService: TopbarMenuService,
    ) {
        topbarMenuService.registerPageOffset(100, destroyRef);
    }

    ngOnInit() {
        this.learningCenter$ = this.content.data.pipe(
            map((data) => {
                const sanityLearningCenter = data.getDocumentByID<SanityLearningCenter>(learningCenterSchemaName);
                return sanityLearningCenter ? new LearningCenter(sanityLearningCenter, data) : null;
            }),
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
                    this.metaTags.register(post.metaTags);
                    this._analytics.hubspot.trackPageView();
                    Prism.highlightAll();
                    document.querySelectorAll("article a[rel*='noreferrer']").forEach((el) => {
                        el.setAttribute("rel", "noopener");
                    });
                } else {
                    this.router.navigate(["learn"], { replaceUrl: true });
                }
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 20000);
            },
            error: (_err) => {
                this.router.navigate(["learn"], { replaceUrl: true });
            },
        });
    }

    categoryDisplayName(category: BlogCategoryID) {
        return blogCategories[category];
    }

    shareOnTwitterURL(post: Article): string {
        return `https://twitter.com/intent/tweet?text=${post.title.toPlainText()}&url=${encodeURIComponent(
            window.location.href,
        )}`;
    }

    shareOnFacebookURL(post: Article): string {
        return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
            window.location.href,
        )}&t=${post.title.toPlainText()}`;
    }

    shareOnLinkedInURL(_post: Article): string {
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    }

    shareOnRedditURL(post: Article): string {
        return `https://www.reddit.com/submit?url=${encodeURIComponent(
            window.location.href,
        )}&title=${post.title.toPlainText()}`;
    }
}

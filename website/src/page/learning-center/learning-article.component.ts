import { Component, DestroyRef, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { combineLatest, map, Observable, of, shareReplay, switchMap } from "rxjs";
import { applicationArticleSchemaName, Article, blogCategories, BlogCategoryID, BlogPost, fundamentalArticleSchemaName, Link, LinkButton } from "typedb-web-schema";
import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";
import { AnalyticsService } from "../../service/analytics.service";
import { WordpressService } from "../../service/wordpress.service";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";

@Component({
    selector: "td-learning-article",
    templateUrl: "./learning-article.component.html",
    styleUrls: ["./learning-article.component.scss"],
})
export class LearningArticleComponent implements OnInit {
    readonly article$: Observable<Article | null>;

    readonly subscribeToNewsletterButton = new LinkButton({
        style: "secondary",
        link: Link.fromAddress("?dialog=newsletter"),
        text: "Subscribe to Newsletter",
        comingSoon: false,
    });

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
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
        this.article$ = combineLatest([this.activatedRoute.data, this.activatedRoute.paramMap]).pipe(
            map(([routeData, params]) => ({ resourceType: routeData["resourceType"], slug: params.get("slug") })),
            switchMap(({ resourceType, slug }) => {
                const articleStream = resourceType === fundamentalArticleSchemaName ? this.blogService.fundamentalArticles : this.blogService.applicationArticles;
                return slug ? this.blogService.getArticleBySlug(articleStream, resourceType, slug) : of(null);
            }),
            shareReplay(1),
        );
    }

    ngOnInit() {
        this.article$.subscribe(
            (post) => {
                if (post) {
                    this.title.setTitle(`TypeDB | Blog > ${post.title}`);
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

    shareOnTwitterURL(post: Article): string {
        return `https://twitter.com/intent/tweet?text=${post.title.toPlainText()}&url=${encodeURIComponent(window.location.href)}`;
    }

    shareOnFacebookURL(post: Article): string {
        return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}&t=${post.title.toPlainText()}`;
    }

    shareOnLinkedInURL(_post: Article): string {
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    }

    shareOnRedditURL(post: Article): string {
        return `https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${post.title.toPlainText()}`;
    }
}

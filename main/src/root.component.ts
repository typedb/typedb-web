import { ChangeDetectorRef, Component, HostBinding, inject, PLATFORM_ID } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router, Event as RouterEvent, RouterOutlet, Scroll } from "@angular/router";
import { TopbarMenuComponent } from "./navigation/topbar/topbar-menu.component";
import { FooterComponent } from "./navigation/footer/footer.component";
import { FeedbackButtonComponent } from "./navigation/feedback/feedback-button.component";
import { ContentService } from "./service/content.service";
import { DialogService } from "./service/dialog.service";
import { SanitySiteBanner, siteBannerSchemaName } from "typedb-web-schema";
import { AnalyticsService } from "./service/analytics.service";
import { filter } from "rxjs";
import { LocationStrategy, ViewportScroller, Location, DOCUMENT, isPlatformBrowser } from "@angular/common";
import { environment } from "./environment/environment";

@Component({
    selector: "td-web-main",
    templateUrl: "./root.component.html",
    imports: [
        RouterOutlet, TopbarMenuComponent, FooterComponent, FeedbackButtonComponent
    ]
})
export class RootComponent {
    @HostBinding("class.has-banner") hasBanner = false;

    private readonly matIconRegistry = inject(MatIconRegistry);
    private readonly domSanitizer = inject(DomSanitizer);
    private readonly contentService = inject(ContentService);
    private readonly dialogService = inject(DialogService);
    private readonly changeDet = inject(ChangeDetectorRef);
    private readonly analyticsService = inject(AnalyticsService);
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly viewportScroller = inject(ViewportScroller);
    private readonly locationStrategy = inject(LocationStrategy);
    private readonly location = inject(Location);
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);

    private _originBeforeNavigation = this.document.location?.origin || '';
    private _pathnameBeforeNavigation = this.locationPathname();

    constructor() {
        this.registerIcons();

        if (isPlatformBrowser(this.platformId)) {
            this.analyticsService.google.loadScriptTag();
            this.dialogService.initHashListener();

            if (environment.env === "production") {
                // Production: static pages, no SPA navigation
                // PostHog auto-captures pageviews; Customer.io needs manual call on load
                this.analyticsService.cio.page();
            } else {
                // Development: SPA mode with client-side navigation
                this.initScrollBehaviour();
                this.capturePageViewOnNavigation();
            }
        }

        this.contentService.data.subscribe((data) => {
            this.hasBanner = !!data.getDocumentByID<SanitySiteBanner>(siteBannerSchemaName)?.isEnabled;
            this.changeDet.markForCheck();
        });
    }

    private capturePageViewOnNavigation() {
        this.router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
            this.analyticsService.posthog.capturePageView();
            this.analyticsService.cio.page();
        });
    }

    private initScrollBehaviour() {
        this.viewportScroller.setOffset([0, 112]);
        this.router.events.pipe(filter((ev: RouterEvent): ev is Scroll => ev instanceof Scroll)).subscribe((ev) => {
            const { anchor, position } = ev;
            this.contentService.data.subscribe((_data) => {
                const state = this.location.getState();
                const preventScrollToAnchor =
                    typeof state === "object" &&
                    state &&
                    "preventScrollToAnchor" in state &&
                    state.preventScrollToAnchor;

                let currentRoute = this.activatedRoute;
                while (currentRoute.firstChild) currentRoute = currentRoute.firstChild;

                if (position) {
                    // backward navigation
                    setTimeout(() => {
                        scrollTo(...position);
                    }, 0);
                } else if (anchor && !preventScrollToAnchor) {
                    setTimeout(() => {
                        this.document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
                    });
                } else if (this.shouldScrollToTop()) {
                    scrollTo(0, 0);
                }

                this._originBeforeNavigation = this.document.location?.origin || '';
                this._pathnameBeforeNavigation = this.locationPathname();
            });
        });
    }

    private shouldScrollToTop(): boolean {
        if (this.pathIsBlogLandingPage(this._pathnameBeforeNavigation) && this.pathIsBlogLandingPage(this.locationPathname())) {
            return false;
        }
        
        if (this._originBeforeNavigation !== this.document.location?.origin || '') return true;
        if (this._pathnameBeforeNavigation !== this.locationPathname()) return true;
        return false;
    }

    private pathIsBlogLandingPage(pathname: string) {
        return pathname === "/blog" || pathname.startsWith("/blog/page/") || pathname.startsWith("/blog/category/");
    }

    private locationPathname(): string {
        return this.router.url.split(/[?#]/)[0] || '/';
    }

    private registerIcons(): void {
        const icons = [
            "arrow-down", "burger-mobile", "burger-tablet", "calendar", "check", "checked", "close", "code",
            "discord-rectangle", "discourse-rectangle", "facebook-rectangle", "github", "github-rectangle", "heart",
            "info", "link", "linkedin", "linkedin-rectangle", "location", "mail", "meetup-rectangle", "reddit-rectangle", "time",
            "twitter-rectangle", "youtube-rectangle",
        ];
        icons.forEach((icon) =>
            this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icon/${icon}.svg`)),
        );
    }
}

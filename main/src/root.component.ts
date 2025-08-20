import { ChangeDetectorRef, Component, HostBinding, inject, PLATFORM_ID } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router, Event as RouterEvent, RouterOutlet, Scroll, NavigationStart } from "@angular/router";
import { TopbarMenuComponent } from "./navigation/topbar/topbar-menu.component";
import { FooterComponent } from "./navigation/footer/footer.component";
import { FeedbackButtonComponent } from "./navigation/feedback/feedback-button.component";
import { ContentService } from "./service/content.service";
import { SanitySiteBanner, siteBannerSchemaName } from "typedb-web-schema";
import { AnalyticsService } from "./service/analytics.service";
import { filter } from "rxjs";
import { CanonicalLinkService } from "./service/canonical-link.service";
import { LocationStrategy, ViewportScroller, Location, DOCUMENT, isPlatformBrowser } from "@angular/common";
import { DialogService } from "./service/dialog.service";

const SITE_URL = "https://typedb.com";

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
    private readonly changeDet = inject(ChangeDetectorRef);
    private readonly analyticsService = inject(AnalyticsService);
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly canonicalLink = inject(CanonicalLinkService);
    private readonly viewportScroller = inject(ViewportScroller);
    private readonly locationStrategy = inject(LocationStrategy);
    private readonly location = inject(Location);
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly dialogService = inject(DialogService);

    private _originBeforeNavigation = this.document.location?.origin || '';
    private _pathnameBeforeNavigation = this.locationPathname();

    constructor() {
        this.dialogService.init();
        this.setCanonicalLinkOnNavigation();
        this.registerIcons();

        if (isPlatformBrowser(this.platformId)) {
            this.initScrollBehaviour();
            this.analyticsService.google.loadScriptTag();
            this.analyticsService.googleTagManager.loadScriptTag();
            this.capturePageViewOnNavigation();
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

    private setCanonicalLinkOnNavigation() {
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationStart) {
                this.canonicalLink.removeCanonical();
            }
            if (e instanceof NavigationEnd) {
                this.canonicalLink.setCanonical(`${SITE_URL}${e.url.split(/[#?]/)[0]}`);
            }
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
                        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
                    });
                } else if (
                    this._originBeforeNavigation !== this.document.location?.origin || '' ||
                    this._pathnameBeforeNavigation !== this.locationPathname()
                ) {
                    scrollTo(0, 0);
                }
                this._originBeforeNavigation = this.document.location?.origin || '';
                this._pathnameBeforeNavigation = this.locationPathname();
            });
        });
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

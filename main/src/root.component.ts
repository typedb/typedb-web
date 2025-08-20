import { ChangeDetectorRef, Component, HostBinding } from "@angular/core";
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
import { LocationStrategy, ViewportScroller } from "@angular/common";
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
    private _originBeforeNavigation: string = window.location.origin;
    private _pathnameBeforeNavigation: string = window.location.pathname;

    constructor(
        private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, contentService: ContentService,
        changeDet: ChangeDetectorRef, analyticsService: AnalyticsService, router: Router, activatedRoute: ActivatedRoute,
        canonicalLink: CanonicalLinkService, viewportScroller: ViewportScroller, locationStrategy: LocationStrategy,
        _dialogService: DialogService,
    ) {
        contentService.data.subscribe((data) => {
            this.hasBanner = !!data.getDocumentByID<SanitySiteBanner>(siteBannerSchemaName)?.isEnabled;
            changeDet.markForCheck();
        });
        this.initScrollBehaviour(router, contentService, activatedRoute, locationStrategy, viewportScroller);
        this.setCanonicalLinkOnNavigation(router, canonicalLink);
        this.capturePageViewOnNavigation(router, analyticsService);
        analyticsService.google.loadScriptTag();
        analyticsService.googleTagManager.loadScriptTag();
        this.registerIcons(this.domSanitizer, this.matIconRegistry);
    }
        
    private capturePageViewOnNavigation(router: Router, analytics: AnalyticsService) {
        router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe(() => {
            analytics.posthog.capturePageView();
            analytics.cio.page();
        });
    }
    
    private setCanonicalLinkOnNavigation(router: Router, canonicalLink: CanonicalLinkService) {
        router.events.subscribe((e) => {
            if (e instanceof NavigationStart) {
                canonicalLink.removeCanonical();
            }
            if (e instanceof NavigationEnd) {
                canonicalLink.setCanonical(`${SITE_URL}${e.url.split(/[#?]/)[0]}`);
            }
        });
    }
    
    private initScrollBehaviour(
        router: Router, contentService: ContentService, activatedRoute: ActivatedRoute, location: LocationStrategy,
        viewportScroller: ViewportScroller,
    ) {
        viewportScroller.setOffset([0, 112]);
        router.events.pipe(filter((ev: RouterEvent): ev is Scroll => ev instanceof Scroll)).subscribe((ev) => {
            const { anchor, position } = ev;
            contentService.data.subscribe((_data) => {
                const state = location.getState();
                const preventScrollToAnchor =
                    typeof state === "object" &&
                    state &&
                    "preventScrollToAnchor" in state &&
                    state.preventScrollToAnchor;
        
                let currentRoute = activatedRoute;
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
                    this._originBeforeNavigation !== window.location.origin ||
                    this._pathnameBeforeNavigation !== window.location.pathname
                ) {
                    scrollTo(0, 0);
                }
                this._originBeforeNavigation = window.location.origin;
                this._pathnameBeforeNavigation = window.location.pathname;
            });
        });
    }

    private registerIcons(domSanitizer: DomSanitizer, matIconRegistry: MatIconRegistry): void {
        const icons = [
            "arrow-down", "burger-mobile", "burger-tablet", "calendar", "check", "checked", "close", "code",
            "discord-rectangle", "discourse-rectangle", "facebook-rectangle", "github", "github-rectangle", "heart",
            "info", "link", "linkedin", "linkedin-rectangle", "location", "mail", "meetup-rectangle", "reddit-rectangle", "time",
            "twitter-rectangle", "youtube-rectangle",
        ];
        icons.forEach((icon) =>
            matIconRegistry.addSvgIcon(icon, domSanitizer.bypassSecurityTrustResourceUrl(`assets/icon/${icon}.svg`)),
        );
    }
}

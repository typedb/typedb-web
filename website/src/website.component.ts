import { DOCUMENT, ViewportScroller } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router, Event as RouterEvent, Scroll } from "@angular/router";

import { NgcCookieConsentService } from "ngx-cookieconsent";
import { filter } from "rxjs";

import { AnalyticsService } from "./service/analytics.service";
import { ContentService } from "./service/content.service";
import { DialogService } from "./service/dialog.service";
import { FormService } from "./service/form.service";
import { TopbarMobileService } from "./service/topbar-mobile.service";

const SITE_URL = "https://typedb.com";

@Component({
    selector: "td-website",
    templateUrl: "./website.component.html",
    styleUrls: [],
})
export class WebsiteComponent {
    private _originBeforeNavigation: string = window.location.origin;
    private _pathnameBeforeNavigation: string = window.location.pathname;

    constructor(
        contentService: ContentService,
        router: Router,
        activatedRoute: ActivatedRoute,
        viewportScroller: ViewportScroller,
        _dialogService: DialogService,
        _topbarMobileService: TopbarMobileService,
        _cookieConsentService: NgcCookieConsentService,
        domSanitizer: DomSanitizer,
        matIconRegistry: MatIconRegistry,
        analyticsService: AnalyticsService,
        _formService: FormService,
        @Inject(DOCUMENT) doc: Document,
    ) {
        this.initScrollBehaviour(router, contentService, activatedRoute, viewportScroller);
        this.setCanonicalLinkOnNavigation(router, doc);
        _topbarMobileService.openState.subscribe((isOpen) => {
            document.body.style.overflowY = isOpen ? "hidden" : "unset";
        });
        analyticsService.google.loadScriptTag();
        analyticsService.googleTagManager.loadScriptTag();
        this.registerIcons(domSanitizer, matIconRegistry);
    }

    private setCanonicalLinkOnNavigation(router: Router, doc: Document) {
        router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((e) => {
            const existingCanonicalLink = doc.head.querySelector("link[rel='canonical']");
            if (existingCanonicalLink) {
                doc.head.removeChild(existingCanonicalLink);
            }
            const canonicalLink = doc.createElement("link");
            canonicalLink.setAttribute("rel", "canonical");
            canonicalLink.setAttribute("href", `${SITE_URL}${e.url.split(/[#?]/)[0]}`);
            doc.head.appendChild(canonicalLink);
        });
    }

    private initScrollBehaviour(
        router: Router,
        contentService: ContentService,
        activatedRoute: ActivatedRoute,
        viewportScroller: ViewportScroller,
    ) {
        viewportScroller.setOffset([0, 112]);
        router.events.pipe(filter((ev: RouterEvent): ev is Scroll => ev instanceof Scroll)).subscribe((ev) => {
            const { anchor, position } = ev;
            contentService.data.subscribe((_data) => {
                let currentRoute = activatedRoute;
                while (currentRoute.firstChild) currentRoute = currentRoute.firstChild;

                if (position) {
                    // backward navigation
                    setTimeout(() => {
                        viewportScroller.scrollToPosition(position);
                    }, 0);
                } else if (anchor && !router.getCurrentNavigation()?.extras?.state?.["preventScrollToAnchor"]) {
                    setTimeout(() => {
                        viewportScroller.scrollToAnchor(anchor);
                    });
                } else if (
                    this._originBeforeNavigation !== window.location.origin ||
                    this._pathnameBeforeNavigation !== window.location.pathname
                ) {
                    window.scrollTo(0, 0);
                }
                this._originBeforeNavigation = window.location.origin;
                this._pathnameBeforeNavigation = window.location.pathname;
            });
        });
    }

    private registerIcons(domSanitizer: DomSanitizer, matIconRegistry: MatIconRegistry): void {
        const icons = [
            "arrow-down",
            "burger-mobile",
            "burger-tablet",
            "calendar",
            "check",
            "checked",
            "close",
            "code",
            "discord-rectangle",
            "discourse-rectangle",
            "facebook-rectangle",
            "github",
            "heart",
            "info",
            "link",
            "linkedin",
            "linkedin-rectangle",
            "location",
            "mail",
            "meetup-rectangle",
            "reddit-rectangle",
            "time",
            "twitter-rectangle",
            "youtube-rectangle",
        ];
        icons.forEach((icon) =>
            matIconRegistry.addSvgIcon(icon, domSanitizer.bypassSecurityTrustResourceUrl(`assets/icon/${icon}.svg`)),
        );
    }
}

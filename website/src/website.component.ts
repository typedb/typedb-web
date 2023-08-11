import { ViewportScroller } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Event as RouterEvent, Router, Scroll } from "@angular/router";
import { NgcCookieConsentService } from "ngx-cookieconsent";
import { filter } from "rxjs";

import { ContentService } from "./service/content.service";
import { DialogService } from "./service/dialog.service";
import { TopbarMobileService } from "./service/topbar-mobile.service";

@Component({
    selector: "typedb-website",
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
    ) {
        viewportScroller.setOffset([0, 112]);
        router.events.pipe(filter((e: RouterEvent): e is Scroll => e instanceof Scroll)).subscribe((e) => {
            contentService.data.subscribe((_data) => {
                let currentRoute = activatedRoute;
                while (currentRoute.firstChild) currentRoute = currentRoute.firstChild;

                if (e.position) {
                    const position = e.position;
                    // backward navigation
                    setTimeout(() => {
                        viewportScroller.scrollToPosition(position);
                    }, 0);
                } else if (e.anchor && !router.getCurrentNavigation()?.extras?.state?.["preventScrollToAnchor"]) {
                    setTimeout(() => {
                        viewportScroller.scrollToAnchor(e.anchor!);
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
        _topbarMobileService.openState.subscribe((isOpen) => {
            document.body.style.overflowY = isOpen ? "hidden" : "unset";
        });
        this.registerIcons(domSanitizer, matIconRegistry);
    }

    private registerIcons(domSanitizer: DomSanitizer, matIconRegistry: MatIconRegistry): void {
        const icons = [
            "arrow_down",
            "burger_mobile",
            "burger_tablet",
            "calendar",
            "check",
            "checked",
            "close",
            "code",
            "discord_rectangle",
            "discourse_rectangle",
            "github",
            "heart",
            "info",
            "link",
            "linkedin",
            "linkedin_rectangle",
            "location",
            "mail",
            "meetup_rectangle",
            "time",
            "twitter_rectangle",
            "youtube_rectangle",
        ];
        icons.forEach((icon) => {
            const fileName = icon.replace("_", "-");
            matIconRegistry.addSvgIcon(
                icon,
                domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${fileName}.svg`),
            );
        });
    }
}

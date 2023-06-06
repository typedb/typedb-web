import { ViewportScroller } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Event as RouterEvent, Router, Scroll } from "@angular/router";
import { filter } from "rxjs";
import { ContentService } from "./service/content.service";
import { DialogService } from "./service/dialog.service";

declare global {
    interface Window {
        _hsq: any[];
    }
}

@Component({
    selector: "typedb-website",
    templateUrl: "./website.component.html",
    styleUrls: [],
})
export class WebsiteComponent {
    private _componentBeforeNavigation: any = null;

    // TODO: (html) cookie consent
    constructor(contentService: ContentService, router: Router, activatedRoute: ActivatedRoute, viewportScroller: ViewportScroller, _dialogService: DialogService) {
        viewportScroller.setOffset([0, 112]);
        router.events.pipe(filter((e: RouterEvent): e is Scroll => e instanceof Scroll)).subscribe(e => {
            contentService.data.subscribe(_data => {
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
                } else if (this._componentBeforeNavigation !== currentRoute.component) {
                    window.scrollTo(0, 0);
                }
                this._componentBeforeNavigation = currentRoute.component;
            });
        });
    }

    onRouteChange(routeChangeEvent: { router: Router }) {
        // HubSpot tracking code
        if (!window._hsq?.length) window._hsq = [];
        window._hsq.push(["setPath"], routeChangeEvent.router.url);
        window._hsq.push(["trackPageView"]);
    }
}

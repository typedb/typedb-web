import { ViewportScroller } from "@angular/common";
import { Component } from "@angular/core";
import { Event, Router, Scroll } from "@angular/router";
import { filter } from "rxjs";

@Component({
    selector: "typedb-website",
    templateUrl: "./website.component.html",
    styleUrls: [],
})
export class WebsiteComponent {
    // TODO: (html) cookie consent
    constructor(router: Router, viewportScroller: ViewportScroller) {
        router.events.pipe(
            filter((e: Event): e is Scroll => e instanceof Scroll)
        ).subscribe(e => {
            if (e.position) {
                const position = e.position;
                // backward navigation
                setTimeout(() => {
                    viewportScroller.scrollToPosition(position);
                }, 0);
            }
        });
    }
}

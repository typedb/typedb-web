import { Component, ElementRef, NgZone, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { generateTopbar, setupTopbarListeners } from "typedb-web-common/lib";

import { ContentService } from "../../service/content.service";
import { TopbarMenuService } from "./topbar-menu.service";

@Component({
    selector: "td-topbar",
    template: ``,
    styleUrls: ["./topbar-menu.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TopbarMenuComponent implements OnInit {
    constructor(
        private contentService: ContentService,
        private elementRef: ElementRef<HTMLElement>,
        private ngZone: NgZone,
        private router: Router,
        private topbarMenuService: TopbarMenuService,
    ) {}

    ngOnInit() {
        this.contentService.getTopbarData().subscribe((data) => {
            this.elementRef.nativeElement.innerHTML = generateTopbar(data);
            const headerEl = setupTopbarListeners();

            if (headerEl) {
                this.setupScrollEvents(headerEl);
                this.setupLinks(headerEl);
            }
        });
    }

    private setupLinks(headerEl: HTMLElement) {
        const links = headerEl.querySelectorAll("a");
        links.forEach((link) =>
            link.addEventListener("click", (ev) => {
                if (link.dataset["type"] === "external") {
                    return;
                }
                const href = link.getAttribute("href");
                if (!href || href.includes("//")) {
                    return;
                }
                ev.preventDefault();

                const url = href.startsWith("?") ? `${window.location.pathname}${href}` : href;
                this.router.navigateByUrl(url, {});
            }),
        );
    }

    private setupScrollEvents(headerEl: HTMLElement) {
        this.ngZone.runOutsideAngular(() => {
            let removeListener = () => {
                /**/
            };
            this.topbarMenuService.offset.subscribe((offset) => {
                removeListener();
                const handleScroll = () => {
                    const opacity = Math.min(window.scrollY / offset, 1);
                    headerEl.style.setProperty("--topbar-background-opacity", `${opacity}`);
                };
                removeListener = () => window.removeEventListener("scroll", handleScroll);
                window.addEventListener("scroll", handleScroll);
                handleScroll();
            });
        });
    }
}

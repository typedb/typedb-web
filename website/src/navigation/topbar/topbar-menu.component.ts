import { Component, ElementRef, NgZone, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { generateTopbar } from "typedb-web-common/lib/topbar";

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
            const headerEl = this.elementRef.nativeElement.querySelector<HTMLElement>(".td-topbar");
            if (headerEl) {
                this.setupScrollEvents(headerEl);
                this.setupLinks(headerEl);

                headerEl.querySelectorAll(".td-topbar-panel-header").forEach((el) =>
                    el.addEventListener("click", () => {
                        el.closest("li")?.classList.toggle("td-topbar-panel-expanded");
                    }),
                );

                const menuButton = headerEl.querySelector(".td-topbar-menu-button");
                menuButton?.addEventListener("click", () => {
                    headerEl.classList.toggle("td-topbar-open");
                    document.body.style.overflowY = headerEl.classList.contains("td-topbar-open") ? "hidden" : "unset";
                });

                let hoveredMenuItem: HTMLLIElement | null = null;

                const links = headerEl.querySelectorAll("a");
                links.forEach((link) =>
                    link.addEventListener("click", () => {
                        hoveredMenuItem = null;
                        updateMenuPanelVisibility();
                        headerEl.classList.remove("td-topbar-open");
                    }),
                );

                const mainListItems = document.querySelectorAll<HTMLLIElement>(".td-topbar-main-area li");

                const updateMenuPanelVisibility = () =>
                    mainListItems.forEach((el) =>
                        el.classList.toggle("td-topbar-panel-hovered", hoveredMenuItem === el),
                    );

                mainListItems.forEach((el) => {
                    el.addEventListener("mouseenter", () => {
                        hoveredMenuItem = el;
                        updateMenuPanelVisibility();
                    });
                    el.addEventListener("mouseleave", () => {
                        hoveredMenuItem = null;
                        updateMenuPanelVisibility();
                    });
                });
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
                    // TODO: we should not hard-code color codes
                    const opacity = Math.min(window.scrollY / offset, 1);
                    headerEl.style.backgroundColor = `rgba(26, 24, 42, ${opacity})`; // vaticle purple
                    headerEl.style.borderBottomColor =
                        opacity === 1 ? "var(--color-secondary-deep-grey)" : "transparent";
                };
                removeListener = () => window.removeEventListener("scroll", handleScroll);
                window.addEventListener("scroll", handleScroll);
                handleScroll();
            });
        });
    }
}

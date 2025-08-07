import { isPlatformBrowser } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, inject, NgZone, OnInit, PLATFORM_ID, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { setupLinks, setupTopbarListeners, topbar } from "typedb-web-common/lib";

import { ContentService } from "../../service/content.service";
import { TopbarMenuService } from "./topbar-menu.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "td-topbar",
    template: ``,
    styleUrls: ["./topbar-menu.component.scss"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TopbarMenuComponent implements OnInit {
    private readonly platformId = inject(PLATFORM_ID);

    constructor(
        private contentService: ContentService,
        private elementRef: ElementRef<HTMLElement>,
        private ngZone: NgZone,
        private router: Router,
        private topbarMenuService: TopbarMenuService,
        private domSanitizer: DomSanitizer,
    ) {}

    ngOnInit() {
        this.contentService.getTopbarData().subscribe((data) => {
            this.elementRef.nativeElement.innerHTML = topbar(data);
            if (isPlatformBrowser(this.platformId)) {
                setupTopbarListeners();
                const headerEl = this.elementRef.nativeElement.querySelector<HTMLElement>(".td-topbar");
                if (!headerEl) throw "Header element not found";
                if (headerEl) {
                    // this.setupScrollEvents(headerEl);
                    setupLinks(headerEl, this.router);
                }
            }
        });
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

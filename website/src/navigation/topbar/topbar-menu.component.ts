import { ChangeDetectionStrategy, Component, ElementRef, NgZone, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { generateTopbar, setupTopbarListeners } from "typedb-web-common/lib";

import { ContentService } from "../../service/content.service";
import { setupLinks } from "../setup-links";
import { TopbarMenuService } from "./topbar-menu.service";

@Component({
    selector: "td-topbar",
    template: ``,
    styleUrls: ["./topbar-menu.component.scss"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
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
                setupLinks(headerEl, this.router);
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

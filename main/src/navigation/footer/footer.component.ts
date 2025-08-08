import { isPlatformBrowser } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { generateFooter, setupLinks } from "typedb-web-common/lib";

import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-footer",
    template: ``,
    styleUrls: ["./footer.component.scss"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FooterComponent implements OnInit {
    private readonly platformId = inject(PLATFORM_ID);
    constructor(
        private contentService: ContentService,
        private elementRef: ElementRef<HTMLElement>,
        private router: Router,
    ) {}

    ngOnInit() {
        this.contentService.getFooterData().subscribe((data) => {
            this.elementRef.nativeElement.innerHTML = generateFooter(data);
            if (!isPlatformBrowser(this.platformId)) return;
            const footerEl = this.elementRef.nativeElement.querySelector<HTMLElement>(".td-footer");
            setupLinks(footerEl, this.router);
        });
    }
}

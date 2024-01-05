import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { generateFooter } from "typedb-web-common/lib";

import { ContentService } from "../../service/content.service";
import { setupLinks } from "../setup-links";

@Component({
    selector: "td-footer",
    template: ``,
    styleUrls: ["./footer.component.scss"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FooterComponent implements OnInit {
    constructor(
        private contentService: ContentService,
        private elementRef: ElementRef<HTMLElement>,
        private router: Router,
    ) {}

    ngOnInit() {
        this.contentService.getFooterData().subscribe((data) => {
            this.elementRef.nativeElement.innerHTML = generateFooter(data);
            const footerEl = this.elementRef.nativeElement.querySelector<HTMLElement>(".td-footer");

            setupLinks(footerEl, this.router);
        });
    }
}

import { Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { Observable, map, tap } from "rxjs";

import { SanityServicePage, ServicePage, TechnicolorBlock, servicePageSchemaName } from "typedb-web-schema";
import { TechnicolorBlockComponent } from "src/framework/technicolor-block/technicolor-block.component";
import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";

@Component({
    selector: "td-service-page",
    templateUrl: "./service-page.component.html",
    styleUrls: ["./service-page.component.scss"],
})
export class ServicePageComponent implements OnInit {
    page$!: Observable<ServicePage | null>;

    constructor(
        private analytics: AnalyticsService,
        private contentService: ContentService,
        private idleMonitor: IdleMonitorService,
        private router: Router,
        private title: Title,
    ) {}

    ngOnInit() {
        this.page$ = this.contentService.data.pipe(
            map((data) => {
                const sanityServicePage = data.getDocumentByID(servicePageSchemaName) as SanityServicePage | undefined;
                return sanityServicePage ? new ServicePage(sanityServicePage, data) : null;
            }),
            tap((page) => {
                if (page) {
                    this.title.setTitle(`${page.title} - TypeDB`);
                    this.analytics.hubspot.trackPageView();
                    setTimeout(() => {
                        this.idleMonitor.fireManualMyAppReadyEvent();
                    }, 10000);
                } else {
                    this.router.navigate(["404"], { skipLocationChange: true });
                }
            }),
        );
    }
}

@Component({
    selector: "td-service-page-technicolor-block",
    template: `<td-technicolor-block
        [block]="block"
        [index]="index"
        [size]="size"
        [noLeadingLine]="index === 0"
        [longUpperChain]="block === page.contactSection"
    />`,
})
export class ServicePageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: ServicePage;

    get index(): number {
        return this.allBlocks.indexOf(this.block);
    }

    get size(): TechnicolorBlockComponent["size"] {
        return this.block === this.page.introSection ? "large" : "medium";
    }

    private get allBlocks(): TechnicolorBlock[] {
        const blocks: (TechnicolorBlock | undefined)[] = [
            this.page.introSection,
            this.page.testimonialsSection,
            this.page.contactSection,
        ];
        return blocks.filter((x): x is TechnicolorBlock => x instanceof TechnicolorBlock);
    }
}

import { Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { Observable, map, tap } from "rxjs";

import { SanitySupportPage, SupportPage, TechnicolorBlock, supportPageSchemaName } from "typedb-web-schema";
import { TechnicolorBlockComponent } from "src/framework/technicolor-block/technicolor-block.component";
import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";

@Component({
    selector: "td-support-page",
    templateUrl: "./support-page.component.html",
})
export class SupportPageComponent implements OnInit {
    page$!: Observable<SupportPage | null>;

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
                const sanitySupportPage = data.getDocumentByID(supportPageSchemaName) as SanitySupportPage | undefined;
                return sanitySupportPage ? new SupportPage(sanitySupportPage, data) : null;
            }),
            tap((page) => {
                if (page) {
                    this.title.setTitle(`${page.title} - TypeDB`);
                    this.analytics.hubspot.trackPageView();
                    setTimeout(() => {
                        this.idleMonitor.fireManualMyAppReadyEvent();
                    }, 15000);
                } else {
                    this.router.navigate(["404"], { skipLocationChange: true });
                }
            }),
        );
    }
}

@Component({
    selector: "td-support-page-technicolor-block",
    template: `<td-technicolor-block
        [block]="block"
        [index]="index"
        [level]="level"
        [noLeadingLine]="index === 0"
        [longUpperChain]="block === page.contactSection"
    />`,
})
export class SupportPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: SupportPage;

    get index(): number {
        return this.allBlocks.indexOf(this.block);
    }

    get level(): TechnicolorBlockComponent["level"] {
        return this.block === this.page.introSection ? "h1" : "h2";
    }

    private get allBlocks(): TechnicolorBlock[] {
        const blocks: (TechnicolorBlock | undefined)[] = [
            this.page.introSection,
            this.page.featureTableSection,
            this.page.testimonialsSection,
            this.page.contactSection,
        ];
        return blocks.filter((x): x is TechnicolorBlock => x instanceof TechnicolorBlock);
    }
}

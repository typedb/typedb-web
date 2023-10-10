import { Component, DestroyRef, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { map, Observable, tap } from "rxjs";
import { SanityServicesPage, ServicesPage, servicesPageSchemaName, TechnicolorBlock } from "typedb-web-schema";

import { TechnicolorBlockComponent } from "src/framework/technicolor-block/technicolor-block.component";
import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";
import { MetaTagsService } from "src/service/meta-tags.service";

@Component({
    selector: "td-services-page",
    templateUrl: "./services-page.component.html",
})
export class ServicesPageComponent implements OnInit {
    page$!: Observable<ServicesPage | null>;

    constructor(
        private analytics: AnalyticsService,
        private contentService: ContentService,
        private destroyRef: DestroyRef,
        private metaTags: MetaTagsService,
        private idleMonitor: IdleMonitorService,
        private router: Router,
        private title: Title,
    ) {}

    ngOnInit() {
        this.page$ = this.contentService.data.pipe(
            map((data) => {
                const sanityServicesPage = data.getDocumentByID(servicesPageSchemaName) as
                    | SanityServicesPage
                    | undefined;
                return sanityServicesPage ? new ServicesPage(sanityServicesPage, data) : null;
            }),
            tap((page) => {
                if (page) {
                    this.title.setTitle(`TypeDB | ${page.title}`);
                    const { unregister } = this.metaTags.register(page.metaTags);
                    this.destroyRef.onDestroy(unregister);
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
    selector: "td-services-page-technicolor-block",
    template: `<td-technicolor-block
        [block]="block"
        [index]="index"
        [level]="level"
        [noLeadingLine]="index === 0"
        [longUpperChain]="block === page.contactSection"
    />`,
})
export class ServicesPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: ServicesPage;

    get index(): number {
        return this.allBlocks.indexOf(this.block);
    }

    get level(): TechnicolorBlockComponent["level"] {
        return this.block === this.page.introSection ? "h1" : "h2";
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

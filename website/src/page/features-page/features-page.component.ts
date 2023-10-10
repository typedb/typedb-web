import { Component, DestroyRef, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { FeaturesPage, featuresPageSchemaName, SanityFeaturesPage } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-features-page",
    templateUrl: "./features-page.component.html",
    styleUrls: ["./features-page.component.scss"],
})
export class FeaturesPageComponent implements OnInit {
    page?: FeaturesPage;

    constructor(
        private router: Router,
        private contentService: ContentService,
        private destroyRef: DestroyRef,
        private metaTags: MetaTagsService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityFeaturesPage = data.getDocumentByID(featuresPageSchemaName) as SanityFeaturesPage;
            if (sanityFeaturesPage) {
                this.page = new FeaturesPage(sanityFeaturesPage, data);
                this._title.setTitle(`TypeDB | ${this.page.title}`);
                const { unregister } = this.metaTags.register(this.page.metaTags);
                this.destroyRef.onDestroy(unregister);
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 15000);
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
        });
    }
}

@Component({
    selector: "td-features-page-technicolor-block",
    template: '<td-technicolor-block [block]="section" [index]="index + 1" [noLeadingLine]=\'index === 0\' />',
})
export class FeaturesPageTechnicolorBlockComponent {
    @Input() section!: TechnicolorBlock;
    @Input() index!: number;
}

import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
    FeatureGridCell,
    FeatureGridLayout,
    FeaturesPage,
    featuresPageSchemaName,
    Illustration,
    SanityFeaturesPage,
} from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";

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
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityFeaturesPage = data.getDocumentByID(featuresPageSchemaName) as SanityFeaturesPage;
            if (sanityFeaturesPage) {
                this.page = new FeaturesPage(sanityFeaturesPage, data);
                this._title.setTitle(`${this.page.title} - TypeDB`);
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

@Component({
    selector: "td-feature-grid",
    templateUrl: "./feature-grid.component.html",
    styleUrls: ["./feature-grid.component.scss"],
})
export class FeatureGridComponent {
    @Input() layout!: FeatureGridLayout;
    @Input() featureRows!: FeatureGridCell[][];
    @Input() illustration?: Illustration;
    columnIndexes!: number[];

    ngOnInit() {
        this.columnIndexes = [...Array(this.featureRows[0].length).keys()];
    }
}

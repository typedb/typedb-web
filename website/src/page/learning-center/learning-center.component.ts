import { Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { LearningCenter, learningCenterSchemaName, SanityLearningCenter } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-learning-center",
    templateUrl: "./learning-center.component.html",
    styleUrls: ["./learning-center.component.scss"],
})
export class LearningCenterComponent implements OnInit {
    learningCenter?: LearningCenter;

    constructor(
        private router: Router,
        private contentService: ContentService,
        private metaTags: MetaTagsService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityLearningCenter = data.getDocumentByID<SanityLearningCenter>(learningCenterSchemaName);
            if (sanityLearningCenter) {
                this.learningCenter = new LearningCenter(sanityLearningCenter, data);
                this._title.setTitle(`TypeDB | ${this.learningCenter.title}`);
                this.metaTags.register(this.learningCenter.metaTags);
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 20000);
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
        });
    }
}

@Component({
    selector: "td-learning-center-block",
    template: '<td-technicolor-block [block]="section" [index]="index + 1" [noLeadingLine]=\'index === 0\' />',
})
export class LearningCenterBlockComponent {
    @Input() section!: TechnicolorBlock;
    @Input() index!: number;
}

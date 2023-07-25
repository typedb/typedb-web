import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
    ConclusionSection,
    IntroPage,
    IntroPageCoreSection,
    introPageSchemaName,
    SanityIntroPage,
} from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";

@Component({
    selector: "td-intro-page",
    templateUrl: "./intro-page.component.html",
    styleUrls: ["./intro-page.component.scss"],
})
export class IntroPageComponent implements OnInit {
    page?: IntroPage;

    constructor(
        private router: Router,
        private contentService: ContentService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityIntroPage = data.getDocumentByID(introPageSchemaName) as SanityIntroPage;
            if (sanityIntroPage) {
                this.page = new IntroPage(sanityIntroPage, data);
                this._title.setTitle(`${this.page.title} - TypeDB`);
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 10000);
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
        });
    }
}

@Component({
    selector: "td-intro-page-technicolor-block",
    template:
        '<td-technicolor-block [block]="block" [index]="index + 1" [noLeadingLine]=\'index === 0\'></td-technicolor-block>',
})
export class IntroPageTechnicolorBlockComponent implements OnInit {
    @Input() section!: IntroPageCoreSection | ConclusionSection;
    @Input() index!: number;
    @Input() page!: IntroPage;

    block!: TechnicolorBlock;

    ngOnInit() {
        this.block = new TechnicolorBlock(this.section);
    }
}

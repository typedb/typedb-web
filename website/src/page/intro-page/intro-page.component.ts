import { Component, DestroyRef, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import {
    ConclusionSection,
    IntroPage,
    IntroPageCoreSection,
    introPageSchemaName,
    SanityIntroPage,
} from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";

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
        private destroyRef: DestroyRef,
        private metaTags: MetaTagsService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityIntroPage = data.getDocumentByID(introPageSchemaName) as SanityIntroPage;
            if (sanityIntroPage) {
                this.page = new IntroPage(sanityIntroPage, data);
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

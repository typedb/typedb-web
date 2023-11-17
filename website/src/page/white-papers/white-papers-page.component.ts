import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import {
    ButtonStyle,
    LinkButton,
    SanityWhitePapersPage,
    WhitePaper,
    WhitePapersPage,
    whitePapersPageSchemaName,
} from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-white-papers-page",
    templateUrl: "./white-papers-page.component.html",
    styleUrls: ["./white-papers-page.component.scss"],
})
export class WhitePapersPageComponent implements OnInit {
    page?: WhitePapersPage;

    constructor(
        private router: Router,
        private contentService: ContentService,
        private metaTags: MetaTagsService,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityWhitePapersPage = data.getDocumentByID(whitePapersPageSchemaName) as SanityWhitePapersPage;
            if (sanityWhitePapersPage) {
                this.page = new WhitePapersPage(sanityWhitePapersPage, data);
                this.metaTags.register(this.page.metaTags);
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 20000);
            } else {
                this.router.navigate(["white-papers"], { replaceUrl: true });
            }
        });
    }

    accessResourceButton(whitePaper: WhitePaper, style: ButtonStyle, text: string): LinkButton {
        return new LinkButton({
            style: style,
            text: text,
            link: whitePaper.detailsPageLink(),
            comingSoon: false,
        });
    }
}

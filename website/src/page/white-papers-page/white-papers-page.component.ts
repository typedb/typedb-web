import { Component, DestroyRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
    ButtonStyle,
    LinkButton,
    SanityWhitePapersPage,
    WhitePaper,
    WhitePapersPage,
    whitePapersPageSchemaName,
} from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { MetaTagsService } from "src/service/meta-tags.service";

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
        private destroyRef: DestroyRef,
        private metaTags: MetaTagsService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityWhitePapersPage = data.getDocumentByID(whitePapersPageSchemaName) as SanityWhitePapersPage;
            if (sanityWhitePapersPage) {
                this.page = new WhitePapersPage(sanityWhitePapersPage, data);
                this._title.setTitle(`${this.page.title} - TypeDB`);
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

    accessResourceButton(whitePaper: WhitePaper, style: ButtonStyle, text: string): LinkButton {
        return new LinkButton({
            style: style,
            text: text,
            link: whitePaper.detailsPageLink(),
            comingSoon: false,
        });
    }
}

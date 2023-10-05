import { Component, DestroyRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
    ActionButton,
    SanityWebinar,
    SanityWebinarsPage,
    Webinar,
    webinarSchemaName,
    WebinarsPage,
    webinarsPageSchemaName,
} from "typedb-web-schema";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { MetaTagsService } from "src/service/meta-tags.service";

@Component({
    selector: "td-webinars-page",
    templateUrl: "./webinars-page.component.html",
    styleUrls: ["./webinars-page.component.scss"],
})
export class WebinarsPageComponent implements OnInit {
    page?: WebinarsPage;
    allWebinars?: Webinar[];

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
            const sanityWebinarsPage = data.getDocumentByID(webinarsPageSchemaName) as SanityWebinarsPage;
            if (sanityWebinarsPage) {
                this.page = new WebinarsPage(sanityWebinarsPage, data);
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
            const sanityWebinars = data.getDocumentsByType(webinarSchemaName) as SanityWebinar[];
            const webinars = sanityWebinars.map((x) => Webinar.fromSanity(x, data));
            const futureWebinars = webinars.filter((x) => !x.isFinished()).sort((a, b) => +a.datetime - +b.datetime);
            const pastWebinars = webinars.filter((x) => x.isFinished()).sort((a, b) => +b.datetime - +a.datetime);
            this.allWebinars = [...futureWebinars, ...pastWebinars];
        });
    }

    get primaryWebinar(): Webinar | undefined {
        return this.page?.introSection?.featuredWebinar;
    }

    get secondaryWebinars(): Webinar[] | undefined {
        return this.page?.featuredWebinarsSection?.featuredWebinars;
    }

    localTimezoneAbbreviation(webinar: Webinar): string {
        return webinar.datetime.toLocaleDateString("en-US", { day: "2-digit", timeZoneName: "short" }).slice(4);
    }
}

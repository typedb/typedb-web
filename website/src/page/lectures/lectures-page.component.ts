import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import {
    Lecture,
    lectureSchemaName,
    LecturesPage,
    lecturesPageSchemaName,
    SanityLecture,
    SanityLecturesPage,
} from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-lectures-page",
    templateUrl: "./lectures-page.component.html",
    styleUrls: ["./lectures-page.component.scss"],
})
export class LecturesPageComponent implements OnInit {
    page?: LecturesPage;
    allLectures?: Lecture[];

    constructor(
        private router: Router,
        private contentService: ContentService,
        private metaTags: MetaTagsService,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityLecturesPage = data.getDocumentByID(lecturesPageSchemaName) as SanityLecturesPage;
            if (sanityLecturesPage) {
                this.page = new LecturesPage(sanityLecturesPage, data);
                this.metaTags.register(this.page.metaTags);
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 20000);
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
            const sanityLectures = data.getDocumentsByType(lectureSchemaName) as SanityLecture[];
            const lectures = sanityLectures.map((x) => Lecture.fromSanity(x, data));
            const futureLectures = lectures.filter((x) => !x.isFinished()).sort((a, b) => +a.datetime - +b.datetime);
            const pastLectures = lectures.filter((x) => x.isFinished()).sort((a, b) => +b.datetime - +a.datetime);
            this.allLectures = [...futureLectures, ...pastLectures];
        });
    }

    get primaryLecture(): Lecture | undefined {
        return this.page?.introSection?.featuredLecture;
    }

    get secondaryLectures(): Lecture[] | undefined {
        return this.page?.featuredLecturesSection?.featuredLectures;
    }

    localTimezoneAbbreviation(lecture: Lecture): string {
        return lecture.datetime.toLocaleDateString("en-US", { day: "2-digit", timeZoneName: "short" }).slice(4);
    }
}

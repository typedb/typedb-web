import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { map, Observable, of } from "rxjs";
import {
    Lecture,
    lectureSchemaName,
    LecturesPage,
    lecturesPageSchemaName,
    SanityDataset,
    SanityLecture,
    SanityLecturesPage,
} from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-lectures-page",
    templateUrl: "./lectures-page.component.html",
    styleUrls: ["./lectures-page.component.scss"],
})
export class LecturesPageComponent extends PageComponentBase<LecturesPage> {
    readonly allLectures$: Observable<Lecture[] | null>;

    constructor(
        activatedRoute: ActivatedRoute,
        analytics: AnalyticsService,
        router: Router,
        title: Title,
        idleMonitor: IdleMonitorService,
        metaTags: MetaTagsService,
        contentService: ContentService,
    ) {
        super(activatedRoute, analytics, router, title, idleMonitor, metaTags, contentService);
        this.allLectures$ = contentService.data.pipe(
            map((data) => {
                const sanityLectures = data.getDocumentsByType(lectureSchemaName) as SanityLecture[];
                const lectures = sanityLectures.map((x) => Lecture.fromSanity(x, data));
                const futureLectures = lectures
                    .filter((x) => !x.isFinished())
                    .sort((a, b) => +a.datetime - +b.datetime);
                const pastLectures = lectures.filter((x) => x.isFinished()).sort((a, b) => +b.datetime - +a.datetime);
                return [...futureLectures, ...pastLectures];
            }),
        );
    }

    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityLecturesPage>(lecturesPageSchemaName);
        return of(page ? new LecturesPage(page, data) : null);
    }

    localTimezoneAbbreviation(lecture: Lecture): string {
        return lecture.datetime.toLocaleDateString("en-US", { day: "2-digit", timeZoneName: "short" }).slice(4);
    }
}

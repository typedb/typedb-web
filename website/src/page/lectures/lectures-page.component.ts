import { AsyncPipe, DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { map, Observable, of } from "rxjs";
import {
    Lecture, lectureSchemaName, LecturesPage, lecturesPageSchemaName, SanityDataset, SanityLecture, SanityLecturesPage,
} from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../../framework/button/button.component";
import { EventDurationPipe } from "../../framework/date/event-duration.pipe";
import { OrdinalDatePipe } from "../../framework/date/ordinal-date.pipe";
import { LecturePanelsComponent } from "../../framework/link-panels/link-panels.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/intro-section/title-body-actions-section.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-lectures-page",
    templateUrl: "./lectures-page.component.html",
    styleUrls: ["./lectures-page.component.scss"],
    standalone: true,
    imports: [
        PageBackgroundComponent, TitleBodyActionsSectionComponent, AspectRatioComponent, RichTextComponent,
        ButtonComponent, SectionCoreComponent, LecturePanelsComponent, MatIconModule, AsyncPipe, DatePipe,
        EventDurationPipe, OrdinalDatePipe, PlainTextPipe
    ],
})
export class LecturesPageComponent extends PageComponentBase<LecturesPage> {
    readonly allLectures$: Observable<Lecture[] | null>;

    constructor(
        activatedRoute: ActivatedRoute, analytics: AnalyticsService, router: Router, title: Title,
        idleMonitor: IdleMonitorService, metaTags: MetaTagsService, contentService: ContentService,
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

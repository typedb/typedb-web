import { AsyncPipe, DatePipe, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, NgZone, ViewEncapsulation } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { map, Observable, of } from "rxjs";
import { sanitiseHtmlID } from "typedb-web-common/lib";
import {
    Lecture, lectureSchemaName, LecturesPage, lecturesPageSchemaName, SanityDataset, SanityLecture, SanityLecturesPage,
} from "typedb-web-schema";

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../../framework/button/button.component";
import { EventDurationPipe } from "../../framework/date/event-duration.pipe";
import { OrdinalDatePipe } from "../../framework/date/ordinal-date.pipe";
import { LecturePanelsComponent } from "../../framework/link-panels/link-panels.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-lectures-page",
    templateUrl: "./lectures-page.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        AspectRatioComponent, RichTextComponent,
        ButtonComponent, SectionCoreComponent, LecturePanelsComponent, MatIconModule, AsyncPipe, DatePipe,
        EventDurationPipe, OrdinalDatePipe, PlainTextPipe, NgOptimizedImage
    ]
})
export class LecturesPageComponent extends PageComponentBase<LecturesPage> {
    readonly allLectures$: Observable<Lecture[] | null>;

    constructor(
        activatedRoute: ActivatedRoute, router: Router, title: Title, zone: NgZone,
        metaTags: MetaTagsService, contentService: ContentService,
    ) {
        super(activatedRoute, router, title, metaTags, zone, contentService);
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

    lectureDetailsButtonId(lecture: Lecture): string {
        return sanitiseHtmlID(`${lecture.title.toSectionID()}_watch`);
    }
}

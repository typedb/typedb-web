import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer, SafeResourceUrl, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from "rxjs";
import {
    ActionButton,
    EventBase,
    Lecture,
    lectureSchemaName,
    Link,
    LinkButton,
    ParagraphWithHighlights,
    SanityLecture,
} from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { AddToCalendarDialogComponent } from "../../framework/dialog/dialog.component";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { FormService } from "../../service/form.service";
import { PopupNotificationService } from "../../service/popup-notification.service";

@Component({
    selector: "td-lecture-details-page",
    templateUrl: "./lecture-details-page.component.html",
    styleUrls: ["./lecture-details-page.component.scss"],
})
export class LectureDetailsPageComponent implements OnInit {
    readonly allLecturesHeading = new ParagraphWithHighlights({
        spans: [
            { text: "TypeDB ", highlight: false },
            { text: "Lectures", highlight: true },
        ],
    });
    readonly isSubmitting$: Observable<boolean>;
    readonly actions$: Observable<ActionButton[] | null>;
    readonly lecture$: Observable<Lecture | null>;
    readonly safeVideoURL$: Observable<SafeResourceUrl | null>;
    private readonly isSubmittingSubject = new BehaviorSubject(false);

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private contentService: ContentService,
        private metaTags: MetaTagsService,
        private _formService: FormService,
        private _popupNotificationService: PopupNotificationService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
        private _plainTextPipe: PlainTextPipe,
        private sanitizer: DomSanitizer,
        private dialog: MatDialog,
    ) {
        this.isSubmitting$ = this.isSubmittingSubject.asObservable();
        this.lecture$ = combineLatest([this.activatedRoute.paramMap, this.contentService.data]).pipe(
            map(([params, data]) => {
                const sanityLectures = data.getDocumentsByType(lectureSchemaName) as SanityLecture[];
                const sanityLecture = sanityLectures.find(
                    (x) => x.slug.current === params.get("slug") && !x.comingSoon,
                );
                return sanityLecture ? Lecture.fromSanity(sanityLecture, data) : null;
            }),
            shareReplay(1),
        );
        const subscribeButton = new LinkButton({
            style: "secondary",
            text: "Subscribe to lectures",
            link: Link.fromAddress("?dialog=newsletter"),
            comingSoon: false,
        });
        const datePipe = new DatePipe("en-US");
        this.actions$ = this.lecture$.pipe(
            map((lecture) => {
                if (lecture?.isFinished() === false) {
                    return [
                        subscribeButton,
                        new ActionButton({
                            style: "primary",
                            text: "Add to calendar",
                            onClick: () => {
                                this.dialog.open<AddToCalendarDialogComponent, { event: EventBase }>(
                                    AddToCalendarDialogComponent,
                                    { width: "560px", maxWidth: "100vw", data: { event: lecture } },
                                );
                            },
                            comingSoon: false,
                        }),
                    ];
                } else if (lecture?.lectureSlidesURL) {
                    return [
                        subscribeButton,
                        new LinkButton({
                            style: "primary",
                            text: "Download slides",
                            link: Object.assign(Link.fromAddress(lecture.lectureSlidesURL), {
                                opensNewTab: false,
                            }),
                            comingSoon: false,
                            download: { filename: lecture.lectureSlidesFileName },
                        }),
                    ];
                } else {
                    return [subscribeButton];
                }
            }),
            shareReplay(1),
        );
        this.safeVideoURL$ = this.lecture$.pipe(
            map((lecture) =>
                lecture?.youtubeVideoID
                    ? this.sanitizer.bypassSecurityTrustResourceUrl(
                          `https://youtube.com/embed/${lecture.youtubeVideoID}`,
                      )
                    : null,
            ),
            shareReplay(1),
        );
    }

    ngOnInit() {
        this.lecture$.subscribe((lecture) => {
            if (lecture) {
                this._title.setTitle(`TypeDB Lecture: ${this._plainTextPipe.transform(lecture.title)}`);
                this.metaTags.register(lecture.metaTags);
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 20000);
                this._formService.embedHubspotForm(lecture.hubspotFormID as string, "hubspot-form-holder", {
                    onLoadingChange: (val) => {
                        this.isSubmittingSubject.next(val);
                    },
                    onSuccess: (_formEl, values) => this.onSubmit(lecture, values),
                });
            } else {
                this.router.navigate(["lectures"], { replaceUrl: true });
            }
        });
    }

    private onSubmit(_lecture: Lecture, _values: Record<string, unknown>) {
        this._analytics.google.reportAdConversion("registerForLecture");
        this._popupNotificationService.success("We'll email you a link to watch the lecture.");
    }

    localTimezoneAbbreviation(lecture: Lecture): string {
        return lecture.datetime.toLocaleDateString("en-US", { day: "2-digit", timeZoneName: "short" }).slice(4);
    }
}

import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from "rxjs";
import {
    ActionButton,
    Lecture,
    lectureSchemaName,
    Link,
    LinkButton,
    ParagraphWithHighlights,
    SanityLecture,
} from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { AirmeetService } from "../../service/airmeet.service";
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
    readonly downloadSlidesActions$: Observable<ActionButton[] | null>;
    readonly lecture$: Observable<Lecture | null>;
    readonly safeVideoURL$: Observable<SafeResourceUrl | null>;
    private readonly isSubmittingSubject = new BehaviorSubject(false);

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private contentService: ContentService,
        private metaTags: MetaTagsService,
        private _formService: FormService,
        private airmeetService: AirmeetService,
        private _popupNotificationService: PopupNotificationService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
        private _plainTextPipe: PlainTextPipe,
        private sanitizer: DomSanitizer,
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
        this.downloadSlidesActions$ = this.lecture$.pipe(
            map((lecture) => {
                return lecture?.lectureSlidesURL
                    ? [
                          new LinkButton({
                              style: "secondary",
                              text: "Subscribe to Lectures",
                              link: Link.fromAddress("?dialog=newsletter"),
                              comingSoon: false,
                          }),
                          new LinkButton({
                              style: "primary",
                              text: "Download slides",
                              link: Object.assign(Link.fromAddress(lecture.lectureSlidesURL), {
                                  opensNewTab: false,
                              }),
                              comingSoon: false,
                              download: { filename: lecture.lectureSlidesFileName },
                          }),
                      ]
                    : null;
            }),
            shareReplay(1),
        );
        this.safeVideoURL$ = this.lecture$.pipe(
            map((lecture) =>
                lecture?.onDemandVideoURL
                    ? this.sanitizer.bypassSecurityTrustResourceUrl(lecture.onDemandVideoURL)
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

    private onSubmit(lecture: Lecture, values: Record<string, unknown>) {
        this._analytics.google.reportAdConversion("registerForLecture");
        this.airmeetService.register({
            airmeetID: lecture.airmeetID as string,
            firstName: `${values["firstname"]}`,
            lastName: `${values["lastname"]}`,
            email: `${values["email"]}`,
            companyName: `${values["company"]}`,
            jobTitle: `${values["job_function"]}`,
        });

        const successMsg = lecture.isFinished()
            ? "A link to watch the lecture has been sent to your email inbox."
            : "A link to join the lecture has been sent to your email inbox.";
        this._popupNotificationService.success(successMsg);
    }

    localTimezoneAbbreviation(lecture: Lecture): string {
        return lecture.datetime.toLocaleDateString("en-US", { day: "2-digit", timeZoneName: "short" }).slice(4);
    }
}

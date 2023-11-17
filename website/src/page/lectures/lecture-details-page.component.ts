import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl, Title } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
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
    lecture?: Lecture;
    isSubmitting = false;
    allLecturesHeading = new ParagraphWithHighlights({
        spans: [
            { text: "TypeDB ", highlight: false },
            { text: "Lectures", highlight: true },
        ],
    });
    downloadSlidesActions?: ActionButton[];
    safeVideoURL?: SafeResourceUrl;

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
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
    ) {}

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentService.data.subscribe((data) => {
                const sanityLectures = data.getDocumentsByType(lectureSchemaName) as SanityLecture[];
                const sanityLecture = sanityLectures.find(
                    (x) => x.slug.current === params.get("slug") && !x.comingSoon,
                );
                if (sanityLecture) {
                    this.lecture = Lecture.fromSanity(sanityLecture, data);
                    this.downloadSlidesActions = this.lecture.lectureSlidesURL
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
                                  link: Object.assign(Link.fromAddress(this.lecture.lectureSlidesURL), {
                                      opensNewTab: false,
                                  }),
                                  comingSoon: false,
                                  download: {},
                              }),
                          ]
                        : undefined;
                    this.safeVideoURL = this.lecture.onDemandVideoURL
                        ? this.sanitizer.bypassSecurityTrustResourceUrl(this.lecture.onDemandVideoURL)
                        : undefined;
                    this._title.setTitle(`TypeDB Lecture: ${this._plainTextPipe.transform(this.lecture.title)}`);
                    this.metaTags.register(this.lecture.metaTags);
                    this._analytics.hubspot.trackPageView();
                    setTimeout(() => {
                        this._idleMonitor.fireManualMyAppReadyEvent();
                    }, 20000);
                    this._formService.embedHubspotForm(this.lecture.hubspotFormID as string, "hubspot-form-holder", {
                        onLoadingChange: (val) => {
                            this.isSubmitting = val;
                        },
                        onSuccess: (_formEl, values) => this.onSubmit(values),
                    });
                } else {
                    this.router.navigate(["lectures"], { replaceUrl: true });
                }
            });
        });
    }

    private onSubmit(values: Record<string, unknown>) {
        this._analytics.google.reportAdConversion("registerForLecture");
        this.airmeetService.register({
            airmeetID: (this.lecture as Lecture).airmeetID as string,
            firstName: `${values["firstname"]}`,
            lastName: `${values["lastname"]}`,
            email: `${values["email"]}`,
            companyName: `${values["company"]}`,
            jobTitle: `${values["job_function"]}`,
        });

        const successMsg = (this.lecture as Lecture).isFinished()
            ? "A link to watch the lecture has been sent to your email inbox."
            : "A link to join the lecture has been sent to your email inbox.";
        this._popupNotificationService.success(successMsg);
    }

    get localTimezoneAbbreviation(): string {
        return (this.lecture as Lecture).datetime
            .toLocaleDateString("en-US", { day: "2-digit", timeZoneName: "short" })
            .slice(4);
    }
}

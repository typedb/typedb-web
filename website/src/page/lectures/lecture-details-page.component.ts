import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { Lecture, lectureSchemaName, SanityLecture } from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

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
    lecture?: Lecture;
    isSubmitting = false;

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private contentService: ContentService,
        private metaTags: MetaTagsService,
        private _formService: FormService,
        private airmeetService: LectureService,
        private _popupNotificationService: PopupNotificationService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
        private _plainTextPipe: PlainTextPipe,
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
                    this._title.setTitle(`TypeDB | ${this._plainTextPipe.transform(this.lecture.title)}`);
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
                    this.router.navigate(["lectures"]);
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

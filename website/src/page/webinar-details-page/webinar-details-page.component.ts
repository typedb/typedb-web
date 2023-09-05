import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SanityWebinar, Webinar, webinarSchemaName } from "typedb-web-schema";
import { ResourceAccessForm } from "../../framework/form/form";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { ContentService } from "../../service/content.service";
import { FormService } from "../../service/form.service";
import { AnalyticsService } from "../../service/analytics.service";
import { PopupNotificationService } from "../../service/popup-notification.service";
import { WebinarService } from "../../service/webinar.service";
import { Title } from "@angular/platform-browser";
import { IdleMonitorService } from "@scullyio/ng-lib";

@Component({
    selector: "td-webinar-details-page",
    templateUrl: "./webinar-details-page.component.html",
    styleUrls: ["./webinar-details-page.component.scss"],
})
export class WebinarDetailsPageComponent implements OnInit {
    webinar?: Webinar;
    form: ResourceAccessForm = { firstName: "", lastName: "", email: "", companyName: "", jobFunction: "" };

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private contentService: ContentService,
        private _formService: FormService,
        private _webinarService: WebinarService,
        private _popupNotificationService: PopupNotificationService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
        private _plainTextPipe: PlainTextPipe,
    ) {}

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentService.data.subscribe((data) => {
                const sanityWebinars = data.getDocumentsByType(webinarSchemaName) as SanityWebinar[];
                const sanityWebinar = sanityWebinars.find(
                    (x) => x.slug.current === params.get("slug") && !x.comingSoon,
                );
                if (sanityWebinar) {
                    this.webinar = Webinar.fromSanity(sanityWebinar, data);
                    this._title.setTitle(`${this._plainTextPipe.transform(this.webinar.title)} - TypeDB Webinars`);
                    this._analytics.hubspot.trackPageView();
                    setTimeout(() => {
                        this._idleMonitor.fireManualMyAppReadyEvent();
                    }, 15000);
                    this._formService.embedHubspotForm(this.webinar.hubspotFormID!, "hubspot-form-holder", (formEl) => {
                        this._webinarService.register({
                            airmeetID: this.webinar!.airmeetID!,
                            firstName: formEl["firstname"].value,
                            lastName: formEl["lastname"].value,
                            email: formEl["email"].value,
                            companyName: formEl["company"].value,
                            jobTitle: formEl["job_function"].value,
                        });
                    });
                } else {
                    this.router.navigate(["404"], { skipLocationChange: true });
                }
            });
        });
    }

    onSubmit() {
        const successMsg = this.webinar!.isFinished()
            ? "A link to watch the webinar has been sent to your email inbox."
            : "A link to join the webinar has been sent to your email inbox.";
        this._popupNotificationService.success(successMsg);
    }

    get localTimezoneAbbreviation(): string {
        return this.webinar!.datetime.toLocaleDateString("en-US", { day: "2-digit", timeZoneName: "short" }).slice(4);
    }
}

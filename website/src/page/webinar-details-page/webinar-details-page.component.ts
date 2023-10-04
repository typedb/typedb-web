import { Component, DestroyRef, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { SanityWebinar, Webinar, webinarSchemaName } from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { FormService } from "../../service/form.service";
import { PopupNotificationService } from "../../service/popup-notification.service";
import { WebinarService } from "../../service/webinar.service";

@Component({
    selector: "td-webinar-details-page",
    templateUrl: "./webinar-details-page.component.html",
    styleUrls: ["./webinar-details-page.component.scss"],
})
export class WebinarDetailsPageComponent implements OnInit {
    webinar?: Webinar;
    isSubmitting = false;

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private contentService: ContentService,
        private destroyRef: DestroyRef,
        private metaTags: MetaTagsService,
        private _formService: FormService,
        private _webinarService: WebinarService,
        private _popupNotificationService: PopupNotificationService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
        private _plainTextPipe: PlainTextPipe,
    ) {}

    ngOnInit() {
        let unregisterMetaTags = () => {
            /**/
        };
        this.destroyRef.onDestroy(() => unregisterMetaTags());
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentService.data.subscribe((data) => {
                const sanityWebinars = data.getDocumentsByType(webinarSchemaName) as SanityWebinar[];
                const sanityWebinar = sanityWebinars.find(
                    (x) => x.slug.current === params.get("slug") && !x.comingSoon,
                );
                if (sanityWebinar) {
                    this.webinar = Webinar.fromSanity(sanityWebinar, data);
                    this._title.setTitle(`TypeDB | ${this._plainTextPipe.transform(this.webinar.title)}`);
                    unregisterMetaTags();
                    const { unregister } = this.metaTags.register(this.webinar.metaTags);
                    unregisterMetaTags = unregister;
                    this._analytics.hubspot.trackPageView();
                    setTimeout(() => {
                        this._idleMonitor.fireManualMyAppReadyEvent();
                    }, 15000);
                    this._formService.embedHubspotForm(this.webinar.hubspotFormID as string, "hubspot-form-holder", {
                        onLoadingChange: (val) => {
                            this.isSubmitting = val;
                        },
                        onSuccess: (_formEl, values) => this.onSubmit(values),
                    });
                } else {
                    this.router.navigate(["404"], { skipLocationChange: true });
                }
            });
        });
    }

    private onSubmit(values: Record<string, unknown>) {
        this._webinarService.register({
            airmeetID: (this.webinar as Webinar).airmeetID as string,
            firstName: `${values["firstname"]}`,
            lastName: `${values["lastname"]}`,
            email: `${values["email"]}`,
            companyName: `${values["company"]}`,
            jobTitle: `${values["job_function"]}`,
        });

        const successMsg = (this.webinar as Webinar).isFinished()
            ? "A link to watch the webinar has been sent to your email inbox."
            : "A link to join the webinar has been sent to your email inbox.";
        this._popupNotificationService.success(successMsg);
    }

    get localTimezoneAbbreviation(): string {
        return (this.webinar as Webinar).datetime
            .toLocaleDateString("en-US", { day: "2-digit", timeZoneName: "short" })
            .slice(4);
    }
}

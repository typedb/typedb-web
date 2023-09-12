import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { IdleMonitorService } from "@scullyio/ng-lib";
import { RequestTechTalkPage, SanityRequestTechTalkPage, requestTechTalkPageSchemaName } from "typedb-web-schema";

import { FormService } from "src/service/form.service";
import { PopupNotificationService } from "src/service/popup-notification.service";
import { ContentService } from "src/service/content.service";
import { AnalyticsService } from "src/service/analytics.service";

@Component({
    selector: "td-request-tech-talk-page",
    templateUrl: "./request-tech-talk-page.component.html",
    styleUrls: ["./request-tech-talk-page.component.scss"],
})
export class RequestTechTalkPageComponent implements OnInit {
    page?: RequestTechTalkPage;
    isSubmitting = false;

    constructor(
        private analytics: AnalyticsService,
        private contentService: ContentService,
        private formService: FormService,
        private idleMonitor: IdleMonitorService,
        private popupNotificationService: PopupNotificationService,
        private router: Router,
        private title: Title,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityRequestTechTalkPage = data.getDocumentByID(
                requestTechTalkPageSchemaName,
            ) as SanityRequestTechTalkPage;
            if (sanityRequestTechTalkPage) {
                this.page = new RequestTechTalkPage(sanityRequestTechTalkPage);
                this.title.setTitle(`${this.page.title} - TypeDB`);
                this.analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this.idleMonitor.fireManualMyAppReadyEvent();
                }, 15000);

                this.formService.embedHubspotForm(this.page.hubspotFormID, "hubspot-form-holder", {
                    onLoadingChange: (val) => {
                        this.isSubmitting = val;
                    },
                    onSuccess: () => this.onSubmit(),
                });
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
        });
    }

    private onSubmit() {
        this.popupNotificationService.success("Your request has been submitted!");
    }
}

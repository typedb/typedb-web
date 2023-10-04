import { Component, DestroyRef, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { SanityWhitePaper, WhitePaper, whitePaperSchemaName } from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { FormService } from "../../service/form.service";
import { PopupNotificationService } from "../../service/popup-notification.service";

@Component({
    selector: "td-white-paper-details-page",
    templateUrl: "./white-paper-details-page.component.html",
    styleUrls: ["./white-paper-details-page.component.scss"],
})
export class WhitePaperDetailsPageComponent implements OnInit {
    whitePaper?: WhitePaper;
    isSubmitting = false;

    constructor(
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private contentService: ContentService,
        private destroyRef: DestroyRef,
        private metaTags: MetaTagsService,
        private _formService: FormService,
        private _popupNotificationService: PopupNotificationService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
        private _plainTextPipe: PlainTextPipe,
    ) {}

    ngOnInit() {
        let unregisterMetaTags = () => {};
        this.destroyRef.onDestroy(() => unregisterMetaTags());
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentService.data.subscribe((data) => {
                const sanityWhitePapers = data.getDocumentsByType(whitePaperSchemaName) as SanityWhitePaper[];
                const sanityWhitePaper = sanityWhitePapers.find((x) => x.slug.current === params.get("slug"));
                if (sanityWhitePaper) {
                    this.whitePaper = WhitePaper.fromSanity(sanityWhitePaper, data);
                    this._title.setTitle(`TypeDB | ${this._plainTextPipe.transform(this.whitePaper.title)}`);
                    unregisterMetaTags();
                    const { unregister } = this.metaTags.register(this.whitePaper.metaTags);
                    unregisterMetaTags = unregister;
                    this._analytics.hubspot.trackPageView();
                    this._formService.embedHubspotForm(this.whitePaper.hubspotFormID, "hubspot-form-holder", {
                        onLoadingChange: (val) => {
                            this.isSubmitting = val;
                        },
                        onSuccess: () => this.onSubmit(),
                    });
                    setTimeout(() => {
                        this._idleMonitor.fireManualMyAppReadyEvent();
                    }, 15000);
                } else {
                    this.router.navigate(["404"], { skipLocationChange: true });
                }
            });
        });
    }

    private onSubmit() {
        this._popupNotificationService.success("Your file will be downloaded shortly.");
        fetch(this.whitePaper!.fileURL)
            .then((resp) => resp.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                // the filename you want
                a.download = this.whitePaper!.fileName || "";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
    }
}

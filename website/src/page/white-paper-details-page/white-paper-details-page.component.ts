import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SanityWhitePaper, WhitePaper, whitePaperSchemaName } from "typedb-web-schema";
import { ResourceAccessForm } from "../../framework/form/form";
import { ContentService } from "../../service/content.service";
import { FormService } from "../../service/form.service";
import { AnalyticsService } from "../../service/analytics.service";
import { PopupNotificationService } from "../../service/popup-notification.service";
import { Title } from "@angular/platform-browser";

@Component({
    selector: "td-white-paper-details-page",
    templateUrl: "./white-paper-details-page.component.html",
    styleUrls: ["./white-paper-details-page.component.scss"]
})
export class WhitePaperDetailsPageComponent implements OnInit {
    whitePaper?: WhitePaper;
    form: ResourceAccessForm = { firstName: "", lastName: "", email: "", companyName: "", jobFunction: "" };

    constructor(private router: Router, private _activatedRoute: ActivatedRoute, private contentService: ContentService, private _formService: FormService,
                private _popupNotificationService: PopupNotificationService, private _title: Title, private _analytics: AnalyticsService) {}

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentService.data.subscribe((data) => {
                const sanityWhitePapers = data.getDocumentsByType(whitePaperSchemaName) as SanityWhitePaper[];
                const sanityWhitePaper = sanityWhitePapers.find(x => x.slug.current === params.get("slug"));
                if (sanityWhitePaper) {
                    this.whitePaper = WhitePaper.fromSanity(sanityWhitePaper, data);
                    this._title.setTitle(`${this.whitePaper.title} - TypeDB White Papers`);
                    this._analytics.hubspot.trackPageView();
                    this._formService.embedHubspotForm(this.whitePaper.hubspotFormID, "hubspot-form-holder");
                } else {
                    this.router.navigate(["404"]);
                }
            });
        });
    }

    onSubmit() {
        this._popupNotificationService.success("Your file will be downloaded shortly.");
        fetch(this.whitePaper!.fileURL)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                // the filename you want
                a.download = this.whitePaper!.fileName || "";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
    }
}

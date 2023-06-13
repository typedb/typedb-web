import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SanityWhitePaper, WhitePaper, whitePaperSchemaName } from "typedb-web-schema";
import { ResourceAccessForm } from "../../framework/form/form";
import { ContentService } from "../../service/content.service";
import { FormService } from "../../service/form.service";
import { PopupNotificationService } from "../../service/popup-notification.service";

@Component({
    selector: "td-white-paper-details-page",
    templateUrl: "./white-paper-details-page.component.html",
    styleUrls: ["./white-paper-details-page.component.scss"]
})
export class WhitePaperDetailsPageComponent implements OnInit {
    whitePaper?: WhitePaper;
    form: ResourceAccessForm = { firstName: "", lastName: "", email: "", companyName: "", jobFunction: "" };

    constructor(private router: Router, private _activatedRoute: ActivatedRoute, private contentService: ContentService, private _formService: FormService, private _popupNotificationService: PopupNotificationService) {}

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentService.data.subscribe((data) => {
                const sanityWhitePapers = data.getDocumentsByType(whitePaperSchemaName) as SanityWhitePaper[];
                const sanityWhitePaper = sanityWhitePapers.find(x => x.slug.current === params.get("slug"));
                if (sanityWhitePaper) {
                    this.whitePaper = WhitePaper.fromSanity(sanityWhitePaper, data);
                    this._formService.embedHubspotForm(this.whitePaper.hubspotFormID, "hubspot-form-holder");
                } else {
                    this.whitePaper = undefined;
                }
            });
        });
    }

    onSubmit() {
        this._popupNotificationService.success("Your message has been sent!");
    }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SanityWebinar, Webinar, webinarSchemaName } from "typedb-web-schema";
import { ResourceAccessForm } from "../../framework/form/form";
import { ContentService } from "../../service/content.service";
import { FormService } from "../../service/form.service";
import { WebinarService } from "../../service/webinar.service";

@Component({
    selector: "td-webinar-details-page",
    templateUrl: "./webinar-details-page.component.html",
    styleUrls: ["./webinar-details-page.component.scss"]
})
export class WebinarDetailsPageComponent implements OnInit {
    webinar?: Webinar;
    form: ResourceAccessForm = { firstName: "", lastName: "", email: "", companyName: "", jobFunction: "" };

    constructor(private router: Router, private _activatedRoute: ActivatedRoute, private contentService: ContentService, private _formService: FormService, private _webinarService: WebinarService) {}

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentService.data.subscribe((data) => {
                const sanityWebinars = data.getDocumentsByType(webinarSchemaName) as SanityWebinar[];
                const sanityWebinar = sanityWebinars.find(x => x.slug.current === params.get("slug"));
                if (sanityWebinar) {
                    this.webinar = Webinar.fromSanity(sanityWebinar, data);
                    this._formService.embedHubspotForm(this.webinar.hubspotFormID, "hubspot-form-holder", (formEl) => {
                        this._webinarService.register({
                            airmeetID: this.webinar!.airmeetID,
                            firstName: formEl["firstname"].value,
                            lastName: formEl["lastname"].value,
                            email: formEl["email"].value,
                            companyName: formEl["company"].value,
                            jobTitle: formEl["job_function"].value,
                        });
                    });
                } else {
                    this.webinar = undefined;
                }
            });
        });
    }

    onSubmit() {
        alert("Thanks for signing up! We'll let you know when this page is implemented, so something actually happens.");
    }
}

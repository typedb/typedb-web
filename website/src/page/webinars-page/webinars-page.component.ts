import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SanityWebinarsPage, WebinarsPage, webinarsPageSchemaName } from "typedb-web-schema";
import { WebinarService } from "../../service/webinar.service";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-webinars-page",
    templateUrl: "./webinars-page.component.html",
    styleUrls: ["./webinars-page.component.scss"]
})
export class WebinarsPageComponent implements OnInit {
    page?: WebinarsPage;

    constructor(private router: Router, private contentService: ContentService, private _webinarService: WebinarService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityWebinarsPage = data.getDocumentByID(webinarsPageSchemaName) as SanityWebinarsPage;
            if (sanityWebinarsPage) {
                this.page = new WebinarsPage(sanityWebinarsPage, data);
            } else {
                this.page = undefined;
            }
        });
        this._webinarService.data.subscribe((data) => {
            console.log(data);
        });
    }
}

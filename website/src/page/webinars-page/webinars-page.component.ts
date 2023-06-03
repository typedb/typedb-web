import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActionButton, SanityWebinarsPage, Webinar, WebinarsPage, webinarsPageSchemaName } from "typedb-web-schema";
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

    get primaryWebinar(): Webinar | undefined {
        return this.page?.introSection?.featuredWebinar;
    }

    get secondaryWebinars(): Webinar[] | undefined {
        return this.page?.featuredWebinarsSection?.featuredWebinars;
    }

    actionButtonForWebinar(webinar: Webinar): ActionButton {
        const isFinished = webinar.isFinished();
        return new ActionButton({
            style: isFinished ? "secondary" : "primary",
            text: isFinished ? "Register" : "Watch now",
        });
    }
}

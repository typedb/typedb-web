import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FeaturesPage, featuresPageSchemaName, SanityFeaturesPage } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-webinars-page",
    templateUrl: "./webinars-page.component.html",
    styleUrls: ["./webinars-page.component.scss"]
})
export class WebinarsPageComponent implements OnInit {
    page?: FeaturesPage;

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityFeaturesPage = data.getDocumentByID(featuresPageSchemaName) as SanityFeaturesPage;
            if (sanityFeaturesPage) {
                this.page = new FeaturesPage(sanityFeaturesPage, data);
            } else {
                this.page = undefined;
            }
        });
    }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HomePage, SanityHomePage, SanityPage } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {

    page?: HomePage;

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityPage = (data.byType["homePage"] as SanityPage[])[0];
            if (sanityPage) {
                this.page = new HomePage(sanityPage as SanityHomePage, data);
            } else {
                this.page = undefined;
            }
        });
    }
}

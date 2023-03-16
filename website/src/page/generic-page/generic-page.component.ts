import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page, PageContent, SanityPage } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-generic-page",
    templateUrl: "./generic-page.component.html",
    styleUrls: ["./generic-page.component.scss"]
})
export class GenericPageComponent implements OnInit {

    page?: Page;

    constructor(private router: Router, private sanityService: ContentService) {}

    ngOnInit() {
        this.sanityService.data.subscribe((data) => {
            const sanityPage = (data.byType["page"] as SanityPage[]).find(x => x.route.current === this.router.url);
            if (sanityPage) {
                this.page = new Page(sanityPage, data);
            } else {
                this.page = undefined;
            }
        });
    }

    get contentBlocks(): PageContent[] | undefined {
        return this.page?.content;
    }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page, PageContent } from "../../model/page";
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
            const rawPage = data.byType["page"].find(x => x["route"].current === this.router.url);
            if (rawPage) {
                this.page = new Page(rawPage, data);
            } else {
                this.page = undefined;
            }
        });
    }

    get contentBlocks(): PageContent[] | undefined {
        return this.page?.content;
    }
}

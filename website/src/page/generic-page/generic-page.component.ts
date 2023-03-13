import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageContent } from "../../model/page";
import { Route } from "../../model/route";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-generic-page",
    templateUrl: "./generic-page.component.html",
    styleUrls: ["./generic-page.component.scss"]
})
export class GenericPageComponent implements OnInit {

    route?: Route;

    constructor(private router: Router, private sanityService: ContentService) {}

    ngOnInit() {
        this.sanityService.data.subscribe((data) => {
            const rawRoute = data.byType["route"].find(x => x["route"].current === this.router.url);
            if (rawRoute) {
                this.route = new Route(rawRoute, data);
            } else {
                this.route = undefined;
            }
        });
    }

    get contentBlocks(): PageContent[] | undefined {
        return this.route?.page.content;
    }
}

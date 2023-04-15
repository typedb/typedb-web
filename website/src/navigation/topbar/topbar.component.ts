import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SanityTopbar, Topbar, topbarSchemaName } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-topbar",
    templateUrl: "./topbar.component.html",
    styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent {
    topbar?: Topbar;

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityTopbar = data.byId[topbarSchemaName] as SanityTopbar;
            if (sanityTopbar) {
                this.topbar = new Topbar(sanityTopbar, data);
            } else {
                this.topbar = undefined;
            }
        });
    }
}

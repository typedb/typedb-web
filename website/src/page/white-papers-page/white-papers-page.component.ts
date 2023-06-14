import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonStyle, LinkButton, SanityWhitePapersPage, WhitePaper, WhitePapersPage, whitePapersPageSchemaName } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { HubspotPixelService } from "../../service/hubspot-pixel.service";

@Component({
    selector: "td-white-papers-page",
    templateUrl: "./white-papers-page.component.html",
    styleUrls: ["./white-papers-page.component.scss"]
})
export class WhitePapersPageComponent implements OnInit {
    page?: WhitePapersPage;

    constructor(private router: Router, private contentService: ContentService, private _title: Title, private _hubspotPixelService: HubspotPixelService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityWhitePapersPage = data.getDocumentByID(whitePapersPageSchemaName) as SanityWhitePapersPage;
            if (sanityWhitePapersPage) {
                this.page = new WhitePapersPage(sanityWhitePapersPage, data);
                this._title.setTitle(`${this.page.title} - TypeDB`);
                this._hubspotPixelService.trackPageView();
            } else {
                this.page = undefined;
            }
        });
    }

    accessResourceButton(whitePaper: WhitePaper, style: ButtonStyle, text: string): LinkButton {
        return new LinkButton({
            style: style,
            text: text,
            link: whitePaper.detailsPageLink(),
            comingSoon: false,
        });
    }
}

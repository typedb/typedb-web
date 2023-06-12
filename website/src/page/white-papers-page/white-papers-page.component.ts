import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonStyle, LinkButton, SanityWhitePapersPage, WhitePaper, WhitePapersPage, whitePapersPageSchemaName } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-white-papers-page",
    templateUrl: "./white-papers-page.component.html",
    styleUrls: ["./white-papers-page.component.scss"]
})
export class WhitePapersPageComponent implements OnInit {
    page?: WhitePapersPage;

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityWhitePapersPage = data.getDocumentByID(whitePapersPageSchemaName) as SanityWhitePapersPage;
            if (sanityWhitePapersPage) {
                this.page = WhitePapersPage.fromSanity(sanityWhitePapersPage, data);
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

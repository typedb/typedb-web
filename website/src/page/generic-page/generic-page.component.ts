import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericPage, SanityGenericPage, TechnicolorBlock, TitleBodyIllustrationSection } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";

@Component({
    selector: "td-generic-page",
    templateUrl: "./generic-page.component.html",
    styleUrls: ["./generic-page.component.scss"]
})
export class GenericPageComponent implements OnInit {
    page?: GenericPage;

    constructor(private router: Router, private _activatedRoute: ActivatedRoute, private contentService: ContentService, private _title: Title, private _analytics: AnalyticsService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            this._activatedRoute.data.subscribe((routeData) => {
                const sanityCloudPage = data.getDocumentByID(routeData["documentID"]) as SanityGenericPage;
                if (sanityCloudPage) {
                    this.page = new GenericPage(sanityCloudPage, data);
                    this._title.setTitle(`${this.page.title} - TypeDB`);
                    this._analytics.hubspot.trackPageView();
                } else {
                    this.router.navigate(["404"]);
                }
            });
        });
    }

    get articleClass(): string {
        return this.router.url.includes("cloud") ? "planet-blue-pink" : "planet-pink";
    }
}

@Component({
    selector: "td-generic-page-technicolor-block",
    template: "<td-technicolor-block [block]=\"block\" [index]=\"index + 1\" size='medium' contentWidth='narrow' [noLeadingLine]='index === 0' [noBody]='true'></td-technicolor-block>",
})
export class GenericPageTechnicolorBlockComponent implements OnInit {
    @Input() section!: TitleBodyIllustrationSection;
    @Input() index!: number;

    block!: TechnicolorBlock;

    ngOnInit() {
        this.block = new TechnicolorBlock(this.section);
    }
}

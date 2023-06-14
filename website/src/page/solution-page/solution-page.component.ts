import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SanitySolutionPage, SolutionPage, solutionPageSchemaName } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";

@Component({
    selector: "td-solution-page",
    templateUrl: "./solution-page.component.html",
    styleUrls: ["./solution-page.component.scss"]
})
export class SolutionPageComponent implements OnInit {
    page?: SolutionPage;

    constructor(private router: Router, private _activatedRoute: ActivatedRoute, private contentService: ContentService, private _title: Title, private _analytics: AnalyticsService) {}

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentService.data.subscribe((data) => {
                const sanityUseCasePages = data.getDocumentsByType(solutionPageSchemaName) as SanitySolutionPage[];
                const sanityUseCasePage = sanityUseCasePages.find(x => x.route.current === params.get("route"));
                if (sanityUseCasePage) {
                    this.page = new SolutionPage(sanityUseCasePage, data);
                    this._title.setTitle(`${this.page.title} - TypeDB Solutions`);
                    this._analytics.hubspot.trackPageView();
                }
            });
        });
    }
}

@Component({
    selector: "td-solution-page-technicolor-block",
    template: "<td-technicolor-block [block]=\"block\" [index]=\"index + 1\" size='medium' [noLeadingLine]='index === 0' [noTrailingLine]=\"noTrailingLine\"></td-technicolor-block>",
})
export class SolutionPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: SolutionPage;

    get allBlocks(): TechnicolorBlock[] {
        return [
            this.page!.useCasesSection, this.page!.challengesSection, this.page!.solutionSection,
            this.page!.furtherReadingSection
        ].filter(x => !!x) as TechnicolorBlock[];
    }

    get index() {
        return this.allBlocks.indexOf(this.block!);
    }

    get noTrailingLine() {
        return this.index >= this.allBlocks.length - 1;
    }
}

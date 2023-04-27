import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SanityUseCasePage, UseCasePage, useCasePageSchemaName } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-use-case-page",
    templateUrl: "./use-case-page.component.html",
    styleUrls: ["./use-case-page.component.scss"]
})
export class UseCasePageComponent implements OnInit {
    page?: UseCasePage;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private contentService: ContentService) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentService.data.subscribe((data) => {
                const sanityUseCasePages = data.byType[useCasePageSchemaName] as SanityUseCasePage[];
                const sanityUseCasePage = sanityUseCasePages.find(x => x.route.current === params.get("route"));
                if (sanityUseCasePage) {
                    this.page = new UseCasePage(sanityUseCasePage, data);
                }
            });
        });
    }
}

@Component({
    selector: "td-use-case-page-technicolor-block",
    template: "<td-technicolor-block [block]=\"block\" [index]=\"index + 1\" size='medium' [noLeadingLine]='index === 0' [noBackgroundImage]='index === 0' [noTrailingLine]=\"noTrailingLine\" [greyLine]='true'></td-technicolor-block>",
})
export class UseCasePageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: UseCasePage;

    get allBlocks(): TechnicolorBlock[] {
        return [
            this.page!.requirementsSection, this.page!.challengesSection, this.page!.solutionSection,
            this.page!.exampleSection, this.page!.furtherReadingSection
        ].filter(x => !!x) as TechnicolorBlock[];
    }

    get index() {
        return this.allBlocks.indexOf(this.block!);
    }

    get noTrailingLine() {
        return this.index >= this.allBlocks.length - 1;
    }
}

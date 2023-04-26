import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {
    HomePage, HomePageCloudSection, HomePageCoreSection, HomePageIntroSection, HomePageSection,
    SanityUseCasePage, UseCasePage, useCasePageSchemaName
} from "typedb-web-schema";
import { HomePageCloudTechnicolorBlock, HomePageIntroTechnicolorBlock, TechnicolorBlock } from "typedb-web-schema";
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
    template: "<td-technicolor-block [block]=\"block\" [index]=\"index\" size='large' [noLeadingLine]='index === 0' [noBackgroundImage]='index === 0' [noTrailingLine]=\"noTrailingLine\"></td-technicolor-block>",
})
export class UseCasePageTechnicolorBlockComponent implements OnInit {
    @Input() section!: HomePageCoreSection;
    @Input() page!: HomePage;

    block!: TechnicolorBlock;

    ngOnInit() {
        if (this.section instanceof HomePageIntroSection) {
            this.block = new HomePageIntroTechnicolorBlock(this.section.title, this.section.body, this.section.iconURL, this.section.actions);
        } else if (this.section instanceof HomePageCloudSection) {
            this.block = new HomePageCloudTechnicolorBlock(this.section.title, this.section.body, this.section.iconURL, this.section.actions);
        } else {
            this.block = new TechnicolorBlock(this.section.title, this.section.body, this.section.iconURL);
        }
    }

    get allBlocks(): HomePageSection[] {
        return [
            this.page!.introSection, this.page!.featuresSection, this.page!.useCasesSection, this.page!.toolingSection,
            this.page!.cloudSection, this.page!.communitySection, this.page!.testimonialsSection
        ].filter(x => !!x) as HomePageSection[];
    }

    get index() {
        return this.allBlocks.indexOf(this.section!);
    }

    get noTrailingLine() {
        return this.index >= this.allBlocks.length - 1;
    }
}

import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HomePage, homePageSchemaName, HomePageUseCase, SanityHomePage } from "typedb-web-schema";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { sanitiseHtmlID } from "../../framework/util";
import { SocialMediaLink } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {

    page?: HomePage;
    socialMediaLinks?: SocialMediaLink[];

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityHomePage = data.byId[homePageSchemaName] as SanityHomePage;
            if (sanityHomePage) {
                this.page = new HomePage(sanityHomePage, data);
                this.socialMediaLinks = this.page.communitySection?.socialMedias.map(x => new SocialMediaLink(x, data));
            }
        });
    }
}

@Component({
    selector: "td-home-page-technicolor-block",
    template: "<td-technicolor-block [block]='block' [index]='index' [size]='size' [noLeadingLine]='index === 0' [noBackgroundImage]='index === 0' [noTrailingLine]=\"noTrailingLine\"></td-technicolor-block>",
})
export class HomePageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: HomePage;

    get allBlocks(): TechnicolorBlock[] {
        return [
            this.page!.introSection, this.page!.featuresSection, this.page!.useCasesSection, this.page!.toolingSection,
            this.page!.cloudSection, this.page!.communitySection, this.page!.testimonialsSection
        ].filter(x => !!x) as TechnicolorBlock[];
    }

    get size(): TechnicolorBlockComponent["size"] {
        return this.block === this.page!.introSection ? "large" : "medium";
    }

    get index() {
        return this.allBlocks.indexOf(this.block!);
    }

    get noTrailingLine() {
        return this.index >= this.allBlocks.length - 1;
    }
}

@Component({
    selector: "td-home-page-use-cases",
    templateUrl: "use-cases.component.html",
    styleUrls: ["use-cases.component.scss"],
})
export class HomePageUseCasesComponent implements OnInit {
    @Input() useCases!: HomePageUseCase[];
    selectedUseCase!: HomePageUseCase;

    ngOnInit() {
        this.selectedUseCase = this.useCases[0];
    }

    tabID(useCase: HomePageUseCase): string {
        return sanitiseHtmlID(useCase.title);
    }

    setSelectedTab(useCase: HomePageUseCase) {
        // TODO: invoke when navigating via hashroute
        this.selectedUseCase = useCase;
    }
}

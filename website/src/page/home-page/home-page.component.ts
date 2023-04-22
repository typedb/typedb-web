import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
    HomePage, HomePageCoreSection, HomePageIntroSection, homePageSchemaName, HomePageSection,
    HomePageUseCase, SanityHomePage
} from "typedb-web-schema";
import { sanitiseHtmlID } from "../../framework/util";
import { SocialMediaLink } from "../../model/social-media-link";
import { HomePageIntroTechnicolorBlock, TechnicolorBlock } from "../../model/technicolor-block";
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
    template: "<td-technicolor-block [block]=\"block\" [index]=\"index\" size='large' [noLeadingLine]='index === 0' [noBackgroundImage]='index === 0' [noTrailingLine]=\"noTrailingLine\"></td-technicolor-block>",
})
export class HomePageTechnicolorBlockComponent implements OnInit {
    @Input() section!: HomePageCoreSection;
    @Input() page!: HomePage;

    block!: TechnicolorBlock;

    ngOnInit() {
        if (this.section instanceof HomePageIntroSection) {
            this.block = new HomePageIntroTechnicolorBlock(this.section.title, this.section.body, this.section.iconURL, this.section.actions);
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

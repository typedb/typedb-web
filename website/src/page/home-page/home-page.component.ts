import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ContentTextTab, HomePage, HomePageCoreSection, HomePageIntroSection, HomePageSection, HomePageUseCase, Organisation, SanityHomePage, SanityPage } from "typedb-web-schema";
import { HomePageIntroTechnicolorBlock, TechnicolorBlock } from "../../model/technicolor-block";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {

    page?: HomePage;

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityPage = (data.byType["homePage"] as SanityPage[])[0];
            if (sanityPage) {
                this.page = new HomePage(sanityPage as SanityHomePage, data);
            } else {
                this.page = undefined;
            }
        });
    }
}

@Component({
    selector: "td-home-page-technicolor-block",
    template: "<td-technicolor-block [block]=\"block\" [index]=\"index\" [numberOfBlocks]=\"allBlocks.length\"></td-technicolor-block>",
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
}

@Component({
    selector: "td-home-page-organisation-logos",
    templateUrl: "organisation-logos.component.html",
    styleUrls: ["organisation-logos.component.scss"],
})
export class HomePageOrganisationLogosComponent {
    @Input() organisations!: Organisation[];
}

@Component({
    selector: "td-home-page-feature-tabs",
    templateUrl: "feature-tabs.component.html",
    styleUrls: ["feature-tabs.component.scss"],
})
export class HomePageFeatureTabsComponent implements OnInit {
    @Input() featureTabs!: ContentTextTab[];
    selectedTab!: ContentTextTab;

    ngOnInit() {
        this.selectedTab = this.featureTabs[0];
    }

    tabID(featureTab: ContentTextTab): string {
        return sanitiseHtmlID(featureTab.title);
    }

    setSelectedTab(featureTab: ContentTextTab) {
        // TODO: invoke when navigating via hashroute
        this.selectedTab = featureTab;
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

function sanitiseHtmlID(raw: string): string {
    return raw.replace(/\s/g, "-")
        .replace(/,/g, "")
        .replace(/&/g, "");
}

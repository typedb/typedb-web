import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ContentTextTab, HomePage, HomePageCoreSection, HomePageIntroSection, Organisation, SanityHomePage, SanityPage } from "typedb-web-schema";
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
    template: "<td-technicolor-block [block]=\"block\" [index]=\"index\" [numberOfBlocks]=\"numberOfBlocks\"></td-technicolor-block>",
})
export class HomePageTechnicolorBlockComponent implements OnInit {
    @Input() section!: HomePageCoreSection;
    @Input() page!: HomePage;

    block!: TechnicolorBlock;

    ngOnInit() {
        if (this.section instanceof HomePageIntroSection) {
            this.block = new HomePageIntroTechnicolorBlock(this.section.title, this.section.body, this.section.iconURL);
        } else {
            this.block = new TechnicolorBlock(this.section.title, this.section.body, this.section.iconURL);
        }
    }

    get index() {
        return this.page!.displayedSections.indexOf(this.section!);
    }

    get numberOfBlocks() {
        return this.page!.displayedSections.length;
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
        return featureTab.title.replace(" ", "-");
    }

    setSelectedTab(featureTab: ContentTextTab) {
        // TODO: invoke when navigating via hashroute
        this.selectedTab = featureTab;
    }
}

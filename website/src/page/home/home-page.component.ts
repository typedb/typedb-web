import { Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { HomePage, homePageSchemaName, Organisation, SanityHomePage } from "typedb-web-schema";
import { SocialMediaLink, TechnicolorBlock } from "typedb-web-schema";

import { MetaTagsService } from "src/service/meta-tags.service";

import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
})
export class HomePageComponent implements OnInit {
    page?: HomePage;
    socialMediaLinks?: SocialMediaLink[];

    constructor(
        private router: Router,
        private contentService: ContentService,
        private metaTags: MetaTagsService,
        private title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService,
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityHomePage = data.getDocumentByID(homePageSchemaName) as SanityHomePage;
            if (sanityHomePage) {
                this.page = new HomePage(sanityHomePage, data);
                this.title.setTitle(`TypeDB: ${this.page.introSection?.title.toPlainText() || "Home"}`);
                this.metaTags.register(this.page.metaTags);
                this.socialMediaLinks = this.page.communitySection?.socialMedias.map(
                    (x) => new SocialMediaLink(x, data),
                );
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 20000);
                Prism.highlightAll();
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
        });
    }
}

@Component({
    selector: "td-home-page-technicolor-block",
    template:
        "<td-technicolor-block [block]='block' [index]='index' [level]='level' [noUpperLine]='index === 0' [longUpperLine]='variant === \"conclusion\"' [organisationLogos]='organisationLogos'></td-technicolor-block>",
})
export class HomePageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: HomePage;
    @Input() variant: "none" | "intro" | "conclusion" = "none";
    @Input() organisationLogos?: Organisation[];

    get allBlocks(): TechnicolorBlock[] {
        return [
            this.page.introSection,
            ...this.page.impactSections,
            this.page.resourcesSection,
            this.page.toolingSection,
            this.page.driversSection,
            this.page.cloudSection,
            this.page.communitySection,
            this.page.testimonialsSection,
            this.page.conclusionSection,
        ].filter((x) => !!x) as TechnicolorBlock[];
    }

    get level(): TechnicolorBlockComponent["level"] {
        return this.block === this.page.introSection ? "h1" : "h2";
    }

    get index() {
        return this.allBlocks.indexOf(this.block);
    }
}

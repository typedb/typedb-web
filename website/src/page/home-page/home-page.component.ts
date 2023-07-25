import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HomePage, homePageSchemaName, SanityHomePage } from "typedb-web-schema";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { SocialMediaLink } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { Title } from "@angular/platform-browser";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";

@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
    page?: HomePage;
    socialMediaLinks?: SocialMediaLink[];

    constructor(
        private router: Router,
        private contentService: ContentService,
        private _title: Title,
        private _analytics: AnalyticsService,
        private _idleMonitor: IdleMonitorService
    ) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityHomePage = data.getDocumentByID(homePageSchemaName) as SanityHomePage;
            if (sanityHomePage) {
                this.page = new HomePage(sanityHomePage, data);
                this._title.setTitle(`${this.page.title} - TypeDB`);
                this.socialMediaLinks = this.page.communitySection?.socialMedias.map(
                    (x) => new SocialMediaLink(x, data)
                );
                this._analytics.hubspot.trackPageView();
                setTimeout(() => {
                    this._idleMonitor.fireManualMyAppReadyEvent();
                }, 10000);
            } else {
                this.router.navigate(["404"], { skipLocationChange: true });
            }
        });
    }
}

@Component({
    selector: "td-home-page-technicolor-block",
    template:
        "<td-technicolor-block [block]='block' [index]='index' [size]='size' [noLeadingLine]='index === 0' [longUpperChain]='variant === \"conclusion\"'></td-technicolor-block>",
})
export class HomePageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: HomePage;
    @Input() variant: "none" | "conclusion" = "none";

    get allBlocks(): TechnicolorBlock[] {
        return [
            this.page!.introSection,
            this.page!.featuresSection,
            this.page!.solutionsSection,
            this.page!.toolingSection,
            this.page!.cloudSection,
            this.page!.communitySection,
            this.page!.testimonialsSection,
            this.page!.conclusionSection,
        ].filter((x) => !!x) as TechnicolorBlock[];
    }

    get size(): TechnicolorBlockComponent["size"] {
        return this.block === this.page!.introSection ? "large" : "medium";
    }

    get index() {
        return this.allBlocks.indexOf(this.block!);
    }
}

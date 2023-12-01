import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { combineLatest, map, Observable, of } from "rxjs";
import {
    HomePage,
    homePageSchemaName,
    Organisation,
    SanityDataset,
    SanityHomePage,
    SocialMediaLink,
} from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";

import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";
import { MetaTagsService } from "src/service/meta-tags.service";

import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent extends PageComponentBase<HomePage> {
    readonly socialMediaLinks$!: Observable<SocialMediaLink[]>;

    constructor(
        activatedRoute: ActivatedRoute,
        analytics: AnalyticsService,
        router: Router,
        title: Title,
        idleMonitor: IdleMonitorService,
        metaTags: MetaTagsService,
        contentService: ContentService,
    ) {
        super(activatedRoute, analytics, router, title, idleMonitor, metaTags, contentService);
        this.socialMediaLinks$ = combineLatest([this.page$, contentService.data]).pipe(
            map(([page, data]) => page?.communitySection?.socialMedias.map((x) => new SocialMediaLink(x, data)) || []),
        );
    }

    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityHomePage>(homePageSchemaName);
        return of(page ? new HomePage(page, data) : null);
    }

    protected override onPageReady(page: HomePage): void {
        super.onPageReady(page);
        this.title.setTitle(`TypeDB: ${page.introSection?.title.toPlainText() || "Home"}`);
        Prism.highlightAll();
    }
}

@Component({
    selector: "td-home-page-technicolor-block",
    template: `<td-technicolor-block
        [block]="block"
        [index]="index"
        [level]="level"
        [noUpperLine]="index === 0"
        [longUpperLine]="variant === 'conclusion'"
        [organisationLogos]="organisationLogos"
    ></td-technicolor-block>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
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

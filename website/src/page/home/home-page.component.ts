import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { of } from "rxjs";
import {
    HomePage, homePageSchemaName, Organisation, SanityDataset, SanityHomePage,
} from "typedb-web-schema";
import { SectionBase } from "typedb-web-schema";

import { AnalyticsService } from "src/service/analytics.service";
import { ContentService } from "src/service/content.service";
import { MetaTagsService } from "src/service/meta-tags.service";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { ContentTabsComponent } from "../../framework/content-tabs/content-tabs.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { KeyPointTableComponent } from "../../framework/key-point/key-point.component";
import { LinkPanelsComponent, ResourcePanelsComponent } from "../../framework/link-panels/link-panels.component";
import { MultiComparisonTabsComponent } from "../../framework/multi-comparison-tabs/multi-comparison-tabs.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { ProductLabelComponent } from "../../framework/product-label/product-label.component";
import { ProductTableComponent } from "../../framework/product-table/product-table.component";
import { SocialMediaPanelsComponent } from "../../framework/social-media/social-media-panels.component";
import { CoreSectionComponent } from "../../framework/section/core-section.component";
import { TestimonialsCarouselComponent } from "../../framework/testimonials-carousel/testimonials-carousel.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-home-page-core-section",
    template: `<td-core-section
        [section]="block"
        [index]="index"
        [level]="level"
        [noUpperLine]="index === 0"
        [organisationLogos]="organisationLogos"
    ></td-core-section>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CoreSectionComponent],
})
export class HomePageCoreSectionComponent {
    @Input() block!: SectionBase;
    @Input() page!: HomePage;
    @Input() variant: "none" | "intro" | "conclusion" = "none";
    @Input() organisationLogos?: Organisation[];

    get allBlocks(): SectionBase[] {
        return [
            this.page.introSection,
            this.page.compareDBsSection,
            this.page.quickLearnSection,
            this.page.cloudSection,
            this.page.testimonialsSection,
            this.page.conclusionSection,
        ].filter((x) => !!x) as SectionBase[];
    }

    get level(): CoreSectionComponent["level"] {
        return this.block === this.page.introSection ? "h1" : "h2";
    }

    get index() {
        return this.allBlocks.indexOf(this.block);
    }
}

@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, HomePageCoreSectionComponent, ContentTabsComponent, ResourcePanelsComponent,
        LinkPanelsComponent, FeatureGridComponent, KeyPointTableComponent, SocialMediaPanelsComponent,
        TestimonialsCarouselComponent, ConclusionPanelComponent, AsyncPipe, MultiComparisonTabsComponent, ProductLabelComponent, ProductTableComponent
    ],
})
export class HomePageComponent extends PageComponentBase<HomePage> {
    // readonly socialMediaLinks$!: Observable<SocialMediaLink[]>;

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
        // this.socialMediaLinks$ = combineLatest([this.page$, contentService.data]).pipe(
        //     map(([page, data]) => page?.communitySection?.socialMedias.map((x) => new SocialMediaLink(x, data)) || []),
        // );
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

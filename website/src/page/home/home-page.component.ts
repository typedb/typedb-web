import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { of } from "rxjs";
import { HomePage, homePageSchemaName, SanityDataset, SanityHomePage } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { KeyPointsShowcaseComponent } from "../../framework/key-points-showcase/key-points-showcase.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { KeyPointTableComponent } from "../../framework/key-point/key-point.component";
import { LinkPanelsComponent, ResourcePanelsComponent } from "../../framework/link-panels/link-panels.component";
import { MultiComparisonTabsComponent } from "../../framework/multi-comparison-tabs/multi-comparison-tabs.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { BrochuresComponent } from "../../framework/brochures/brochures.component";
import { ProductTableComponent } from "../../framework/product-table/product-table.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { SocialMediaPanelsComponent } from "../../framework/social-media/social-media-panels.component";
import { TestimonialsCarouselComponent } from "../../framework/testimonials-carousel/testimonials-carousel.component";
import { AnalyticsService } from "../../service/analytics.service";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, KeyPointsShowcaseComponent, ResourcePanelsComponent, LinkPanelsComponent,
        FeatureGridComponent, KeyPointTableComponent, SocialMediaPanelsComponent, TestimonialsCarouselComponent,
        ConclusionPanelComponent, AsyncPipe, MultiComparisonTabsComponent, BrochuresComponent, ProductTableComponent,
        SectionCoreComponent
    ],
})
export class HomePageComponent extends PageComponentBase<HomePage> {
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

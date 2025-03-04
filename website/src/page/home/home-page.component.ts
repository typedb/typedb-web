import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";



import { IdleMonitorService } from "@scullyio/ng-lib";
import Prism from "prismjs";
import { combineLatest, map, Observable, of } from "rxjs";
import { HomePage, homePageSchemaName, SanityDataset, SanityHomePage, SocialMediaLink } from "typedb-web-schema";



import { ContentService } from "src/service/content.service";
import { MetaTagsService } from "src/service/meta-tags.service";



import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { ContentTabsComponent } from "../../framework/content-tabs/content-tabs.component";
import { FeatureFusionComponent } from "../../framework/feature-fusion/feature-fusion.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { HotTopicsComponent } from "../../framework/hot-topics/hot-topics.component";
import { KeyPointTableComponent } from "../../framework/key-point/key-point.component";
import { LinkPanelsComponent, ResourcePanelsComponent } from "../../framework/link-panels/link-panels.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { SocialMediaPanelsComponent } from "../../framework/social-media/social-media-panels.component";
import { TestimonialsCarouselComponent } from "../../framework/testimonials-carousel/testimonials-carousel.component";
import { PageComponentBase } from "../page-component-base";


@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ContentTabsComponent,
        ResourcePanelsComponent,
        LinkPanelsComponent,
        FeatureGridComponent,
        KeyPointTableComponent,
        SocialMediaPanelsComponent,
        TestimonialsCarouselComponent,
        ConclusionPanelComponent,
        AsyncPipe,
        HotTopicsComponent,
        SectionCoreComponent,
        FeatureFusionComponent,
    ],
})
export class HomePageComponent extends PageComponentBase<HomePage> {
    readonly socialMediaLinks$!: Observable<SocialMediaLink[]>;

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        title: Title,
        idleMonitor: IdleMonitorService,
        metaTags: MetaTagsService,
        contentService: ContentService,
    ) {
        super(activatedRoute, router, title, idleMonitor, metaTags, contentService);
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

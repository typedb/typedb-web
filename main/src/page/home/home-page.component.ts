import { AsyncPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, Input, NgZone, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, map, Observable, of } from "rxjs";
import { HomePage, homePageSchemaName, SanityDataset, SanityHomePage, SocialMediaLink } from "typedb-web-schema";
import { ContentService } from "src/service/content.service";
import { MetaTagsService } from "src/service/meta-tags.service";
import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { HotTopicsComponent } from "../../framework/hot-topics/hot-topics.component";
import { IntegrationsGridComponent } from "../../framework/integrations-grid/integrations-grid.component";
import { KeyPointPanels2x2Component } from "../../framework/key-point/key-point-panels-2x2.component";
import { SimpleLinkPanelsComponent } from "../../framework/link-panels/simple/simple-link-panels.component";
import { PolyglotComparisonComponent } from "../../framework/polyglot-comparison/polyglot-comparison.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { SocialMediaPanelsComponent } from "../../framework/social-media/social-media-panels.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        AsyncPipe, SectionCoreComponent, IntegrationsGridComponent, HotTopicsComponent,
        PolyglotComparisonComponent,
        SimpleLinkPanelsComponent, SocialMediaPanelsComponent, ConclusionPanelComponent, KeyPointPanels2x2Component
    ]
})
export class HomePageComponent extends PageComponentBase<HomePage> {
    readonly socialMediaLinks$!: Observable<SocialMediaLink[]>;

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        title: Title,
        metaTags: MetaTagsService, 
        contentService: ContentService,
        zone: NgZone
    ) {
        super(activatedRoute, router, title, metaTags, zone, contentService);
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
    }
}

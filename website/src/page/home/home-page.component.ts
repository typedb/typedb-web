import { AsyncPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, map, Observable, of } from "rxjs";
import { HomePage, homePageSchemaName, SanityDataset, SanityHomePage, SocialMediaLink } from "typedb-web-schema";
import { ContentService } from "src/service/content.service";
import { MetaTagsService } from "src/service/meta-tags.service";
import { HotTopicsComponent } from "../../framework/hot-topics/hot-topics.component";
import { IntegrationsGridComponent } from "../../framework/integrations-grid/integrations-grid.component";
import { LinkPanelsComponent, ResourcePanelsComponent } from "../../framework/link-panels/link-panels.component";
import { TitleBodyIllustrationSectionComponent } from "../../framework/section/illustration/title-body-illustration-section.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { SocialValidationSectionComponent } from "../../framework/social-validation/social-validation-section.component";
import { HeadingWithHighlightsComponent, ParagraphWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        LinkPanelsComponent, AsyncPipe, SectionCoreComponent, IntegrationsGridComponent, HotTopicsComponent,
        TitleBodyIllustrationSectionComponent, SocialValidationSectionComponent
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
    ) {
        super(activatedRoute, router, title, metaTags, contentService);
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

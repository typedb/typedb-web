import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { combineLatest, map } from "rxjs";
import { ComposablePage, composablePageSchemaName, IllustrationSection, SanityComposablePage, SanityDataset, SectionCore } from "typedb-web-schema";
import { FloatingDotsBackgroundComponent } from "../../framework/background/floating-dots-background.component";
import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { ContactFormComponent } from "../../framework/contact-form/contact-form.component";
import { ContentPanelComponent } from "../../framework/content-panel/content-panel.component";
import { BenchmarkSectionComponent } from "../../framework/benchmark/benchmark-section.component";
import { CardSwitcherComponent } from "../../framework/card-switcher/card-switcher.component";
import { ClosingPanelSectionComponent } from "../../framework/closing-panel/closing-panel-section.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { LinkDirective } from "../../framework/link/link.directive";
import { NumberedListSectionComponent } from "../../framework/numbered-list/numbered-list-section.component";
import { OrganisationLogosComponent } from "../../framework/organisation-logos/organisation-logos.component";
import { SolutionCardsComponent } from "../../framework/solution-cards/solution-cards.component";
import { FeatureTableComponent } from "../../framework/feature-table/feature-table.component";
import { HotTopicsComponent } from "../../framework/hot-topics/hot-topics.component";
import { KeyPointPanels2x2Component } from "../../framework/key-point/key-point-panels-2x2.component";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { PricingTableComponent } from "../../framework/pricing-table/pricing-table.component";
import { SimpleLinkPanelsComponent } from "../../framework/link-panels/simple/simple-link-panels.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { portableTextToPlainText } from "../../service/portable-text-utils";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-composable-page",
    templateUrl: "./composable-page.component.html",
    styleUrls: ["./composable-page.component.scss"],

    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        AsyncPipe, BenchmarkSectionComponent, CardSwitcherComponent, ClosingPanelSectionComponent, LinkDirective,
        NumberedListSectionComponent, OrganisationLogosComponent, SolutionCardsComponent, ConclusionPanelComponent, ContactFormComponent, ContentPanelComponent, FeatureGridComponent, FeatureTableComponent,
        FloatingDotsBackgroundComponent, HotTopicsComponent, KeyPointPanels2x2Component, LinkPanelsComponent,
        PricingTableComponent, SectionCoreComponent, SimpleLinkPanelsComponent,
    ],
})
export class ComposablePageComponent extends PageComponentBase<ComposablePage> {
    protected override getPage(db: SanityDataset) {
        // The home page route has no :slug param and passes its fixed route ("/") as route data instead
        return combineLatest([this.activatedRoute.paramMap, this.activatedRoute.data]).pipe(
            map(([params, data]) => {
                const route = data["composableRoute"] ?? params.get("slug");
                const pages = db.getDocumentsByType<SanityComposablePage>(composablePageSchemaName);
                const page = pages.find((x) => x.route?.current === route);
                return page ? new ComposablePage(page, db) : null;
            }),
        );
    }

    flexDirectionOf(section: IllustrationSection, isFirst: boolean): "row" | "row-reverse" | "column" {
        return section.layoutDirection === "auto" ? (isFirst ? "row" : "column") : section.layoutDirection;
    }

    textAlignOf(section: SectionCore): "left" | "center" | undefined {
        return section.textAlign === "auto" ? undefined : section.textAlign;
    }

    protected override getMetaTagFallbacks(page: ComposablePage) {
        return {
            title: page.title,
            description: portableTextToPlainText(page.sections[0]?.section.body) || undefined,
        };
    }

    protected override onPageReady(page: ComposablePage): void {
        super.onPageReady(page);
        this.title.setTitle(page.title);
    }
}

import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { map } from "rxjs";
import { ComparePageInstance, comparePageSchemaName, SanityComparePageInstance, SanityDataset } from "typedb-web-schema";
import { ClosingPanelSectionComponent } from "../../framework/closing-panel/closing-panel-section.component";
import { CompareChoiceSectionComponent } from "../../framework/compare/compare-choice-section.component";
import { CompareFeatureSectionComponent } from "../../framework/compare/compare-feature-section.component";
import { CompareTableComponent } from "../../framework/compare/compare-table.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PageComponentBase } from "../page-component-base";
import { portableTextToPlainText } from "src/service/portable-text-utils";

@Component({
    selector: "td-compare-page",
    templateUrl: "./compare-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        AsyncPipe, ClosingPanelSectionComponent, CompareChoiceSectionComponent, CompareFeatureSectionComponent,
        CompareTableComponent, SectionCoreComponent,
    ],
})
export class ComparePageComponent extends PageComponentBase<ComparePageInstance> {
    protected override getPage(db: SanityDataset) {
        return this.activatedRoute.paramMap.pipe(
            map((params) => {
                const sanityComparePageInstances = db.getDocumentsByType<SanityComparePageInstance>(comparePageSchemaName);
                const page = sanityComparePageInstances.find((x) => x.route.current === params.get("slug"));
                return page ? new ComparePageInstance(page, db) : null;
            }),
        );
    }

    protected override getMetaTagFallbacks(page: ComparePageInstance) {
        const bodyText = portableTextToPlainText(page.introSection?.body);

        return {
            title: `TypeDB vs ${page.title}`,
            description: bodyText || `How TypeDB and ${page.title} differ, and when to choose each`,
        };
    }

    protected override onPageReady(page: ComparePageInstance): void {
        super.onPageReady(page);
        this.title.setTitle(`TypeDB vs ${page.title}`);
    }
}

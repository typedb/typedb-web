import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { of } from "rxjs";
import { FeaturesPage, featuresPageSchemaName, SanityDataset, SanityFeaturesPage } from "typedb-web-schema";
import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { TitleBodyActionsSectionComponent } from "../../framework/section/title-body-actions-section.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-features-page",
    templateUrl: "./features-page.component.html",
    styleUrls: ["./features-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        TitleBodyActionsSectionComponent, FeatureGridComponent, ConclusionPanelComponent, AsyncPipe,
        SectionCoreComponent,
    ],
})
export class FeaturesPageComponent extends PageComponentBase<FeaturesPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityFeaturesPage>(featuresPageSchemaName);
        return of(page ? new FeaturesPage(page, data) : null);
    }
}

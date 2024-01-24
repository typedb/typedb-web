import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, Input } from "@angular/core";

import { of } from "rxjs";
import { FeaturesPage, featuresPageSchemaName, SanityDataset, SanityFeaturesPage } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/section/title-body-actions-section.component";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-features-page",
    templateUrl: "./features-page.component.html",
    styleUrls: ["./features-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    PageBackgroundComponent,
    TitleBodyActionsSectionComponent,
    forwardRef(() => FeaturesPageTechnicolorBlockComponent),
    FeatureGridComponent,
    ConclusionPanelComponent,
    AsyncPipe
],
})
export class FeaturesPageComponent extends PageComponentBase<FeaturesPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityFeaturesPage>(featuresPageSchemaName);
        return of(page ? new FeaturesPage(page, data) : null);
    }
}

@Component({
    selector: "td-features-page-technicolor-block",
    template: `<td-technicolor-block [block]="section" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TechnicolorBlockComponent],
})
export class FeaturesPageTechnicolorBlockComponent {
    @Input() section!: TechnicolorBlock;
    @Input() index!: number;
}

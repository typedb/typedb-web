import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import { FeaturesPage, featuresPageSchemaName, SanityDataset, SanityFeaturesPage } from "typedb-web-schema";
import { SectionBase } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/intro-section/title-body-actions-section.component";
import { CoreSectionComponent } from "../../framework/section/core-section.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-features-page-core-section",
    template: `<td-core-section [section]="section" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CoreSectionComponent],
})
export class FeaturesPageCoreSectionComponent {
    @Input() section!: SectionBase;
    @Input() index!: number;
}

@Component({
    selector: "td-features-page",
    templateUrl: "./features-page.component.html",
    styleUrls: ["./features-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, TitleBodyActionsSectionComponent, FeaturesPageCoreSectionComponent,
        FeatureGridComponent, ConclusionPanelComponent, AsyncPipe
    ],
})
export class FeaturesPageComponent extends PageComponentBase<FeaturesPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityFeaturesPage>(featuresPageSchemaName);
        return of(page ? new FeaturesPage(page, data) : null);
    }
}

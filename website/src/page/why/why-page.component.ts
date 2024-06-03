import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import { SanityDataset, SanityWhyPage, SectionBase, WhyPage, whyPageSchemaName } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureFusionComponent } from "../../framework/feature-fusion/feature-fusion.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/intro-section/title-body-actions-section.component";
import { CoreSectionComponent } from "../../framework/section/core-section.component";
import { FeaturesPageCoreSectionComponent } from "../features/features-page.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-why-page-core-section",
    template: `<td-core-section [section]="section" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CoreSectionComponent],
})
export class WhyPageCoreSectionComponent {
    @Input() section!: SectionBase;
    @Input() index!: number;
}

@Component({
    selector: "td-why-page",
    templateUrl: "./why-page.component.html",
    styleUrls: ["./why-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, TitleBodyActionsSectionComponent, WhyPageCoreSectionComponent,
        FeatureGridComponent, ConclusionPanelComponent, AsyncPipe, FeaturesPageCoreSectionComponent, FeatureFusionComponent
    ],
})
export class WhyPageComponent extends PageComponentBase<WhyPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityWhyPage>(whyPageSchemaName);
        return of(page ? new WhyPage(page, data) : null);
    }
}

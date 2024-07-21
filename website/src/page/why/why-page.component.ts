import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { of } from "rxjs";
import { SanityDataset, SanityWhyPage, WhyPage, whyPageSchemaName } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureFusionComponent } from "../../framework/feature-fusion/feature-fusion.component";
import { FeatureGridComponent } from "../../framework/feature-grid/feature-grid.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/intro-section/title-body-actions-section.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-why-page",
    templateUrl: "./why-page.component.html",
    styleUrls: ["./why-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, TitleBodyActionsSectionComponent, FeatureGridComponent, ConclusionPanelComponent,
        AsyncPipe, FeatureFusionComponent, SectionCoreComponent
    ],
})
export class WhyPageComponent extends PageComponentBase<WhyPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityWhyPage>(whyPageSchemaName);
        return of(page ? new WhyPage(page, data) : null);
    }
}

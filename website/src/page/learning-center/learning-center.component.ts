import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, Input } from "@angular/core";

import { of } from "rxjs";
import { LearningCenter, learningCenterSchemaName, SanityDataset, SanityLearningCenter } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { LinkPanelsCols2Component } from "../../framework/link-panels/link-panels.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/section/title-body-actions-section.component";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-learning-center",
    templateUrl: "./learning-center.component.html",
    styleUrls: ["./learning-center.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    PageBackgroundComponent,
    TitleBodyActionsSectionComponent,
    forwardRef(() => LearningCenterBlockComponent),
    LinkPanelsCols2Component,
    ConclusionPanelComponent,
    AsyncPipe
],
})
export class LearningCenterComponent extends PageComponentBase<LearningCenter> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityLearningCenter>(learningCenterSchemaName);
        return of(page ? new LearningCenter(page, data) : null);
    }
}

@Component({
    selector: "td-learning-center-block",
    template: `<td-technicolor-block [block]="section" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TechnicolorBlockComponent],
})
export class LearningCenterBlockComponent {
    @Input() section!: TechnicolorBlock;
    @Input() index!: number;
}

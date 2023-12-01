import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import { LearningCenter, learningCenterSchemaName, SanityDataset, SanityLearningCenter } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";

import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-learning-center",
    templateUrl: "./learning-center.component.html",
    styleUrls: ["./learning-center.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
})
export class LearningCenterBlockComponent {
    @Input() section!: TechnicolorBlock;
    @Input() index!: number;
}

import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ResourceSection } from "typedb-web-schema";

import { ResourcePanelsComponent } from "../link-panels/link-panels.component";
import { TechnicolorBlockComponent } from "../technicolor-block/technicolor-block.component";

@Component({
    selector: "td-further-learning",
    templateUrl: "./further-learning.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TechnicolorBlockComponent, ResourcePanelsComponent],
})
export class FurtherLearningComponent {
    @Input() value!: ResourceSection;
}

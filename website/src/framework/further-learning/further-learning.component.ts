import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ResourceSection } from "typedb-web-schema";

import { ResourcePanelsComponent } from "../link-panels/link-panels.component";
import { SectionCoreComponent } from "../section/section-core.component";

@Component({
    selector: "td-further-learning",
    templateUrl: "./further-learning.component.html",
    styleUrls: ["./further-learning.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SectionCoreComponent, ResourcePanelsComponent],
})
export class FurtherLearningComponent {
    @Input() value!: ResourceSection;
}

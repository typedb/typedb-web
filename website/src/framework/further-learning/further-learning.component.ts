import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

import { ResourceSection } from "typedb-web-schema";

import { ResourcePanelsComponent } from "../link-panels/link-panels.component";
import { SectionCoreComponent } from "../section/section-core.component";

@Component({
    selector: "td-further-learning",
    templateUrl: "./further-learning.component.html",
    styles: [`:host { display: block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SectionCoreComponent, ResourcePanelsComponent],
})
export class FurtherLearningComponent {
    @Input() value!: ResourceSection;
    @HostBinding("class") clazz = "section section-margin";
}

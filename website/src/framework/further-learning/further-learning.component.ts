import { Component, Input } from "@angular/core";

import { ResourceSection } from "typedb-web-schema";

@Component({
    selector: "td-further-learning",
    templateUrl: "./further-learning.component.html",
})
export class FurtherLearningComponent {
    @Input() value!: ResourceSection;
}

import { Component, Input } from "@angular/core";
import { ConclusionPanel } from "typedb-web-schema";

@Component({
    selector: "td-conclusion-panel",
    templateUrl: "conclusion-panel.component.html",
    styleUrls: ["conclusion-panel.component.scss"],
})
export class ConclusionPanelComponent {
    @Input() panel!: ConclusionPanel;
}

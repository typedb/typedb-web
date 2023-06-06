import { Component, Input } from "@angular/core";
import { ContentTextPanel } from "typedb-web-schema";

@Component({
    selector: "td-content-panel-grid",
    templateUrl: "content-panel-grid.component.html",
    styleUrls: ["content-panel-grid.component.scss"],
})
export class ContentPanelGridComponent {
    @Input() panels!: ContentTextPanel[];
}

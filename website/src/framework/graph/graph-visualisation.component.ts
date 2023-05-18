import { Component, Input } from "@angular/core";
import { GraphVisualisation } from "typedb-web-schema";

@Component({
    selector: "td-graph-visualisation",
    templateUrl: "graph-visualisation.component.html",
    styleUrls: ["graph-visualisation.component.scss"],
})
export class GraphVisualisationComponent {
    @Input() graph!: GraphVisualisation;
}

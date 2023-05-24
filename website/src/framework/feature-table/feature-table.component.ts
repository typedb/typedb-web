import { Component, Input } from "@angular/core";
import { FeatureTable } from "typedb-web-schema";

@Component({
    selector: "td-feature-table",
    templateUrl: "feature-table.component.html",
    styleUrls: ["./feature-table.component.scss"],
})
export class FeatureTableComponent {
    @Input() table!: FeatureTable;
}

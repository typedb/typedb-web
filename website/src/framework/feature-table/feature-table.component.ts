import { Component, Input } from "@angular/core";

import { FeatureTable, FeatureTableCell, LinkButton } from "typedb-web-schema";

@Component({
    selector: "td-feature-table",
    templateUrl: "feature-table.component.html",
    styleUrls: ["./feature-table.component.scss"],
})
export class FeatureTableComponent {
    @Input() table!: FeatureTable;
}

@Component({
    selector: "td-feature-table-cell",
    templateUrl: "feature-table-cell.component.html",
    styleUrls: ["./feature-table-cell.component.scss"],
})
export class FeatureTableCellComponent {
    @Input() cell!: FeatureTableCell;

    get booleanValue(): boolean | undefined {
        return typeof this.cell === "boolean" ? this.cell : undefined;
    }

    get stringValue(): string | undefined {
        return typeof this.cell === "string" ? this.cell : undefined;
    }

    get buttonValue(): LinkButton | undefined {
        return this.cell instanceof LinkButton ? this.cell : undefined;
    }
}

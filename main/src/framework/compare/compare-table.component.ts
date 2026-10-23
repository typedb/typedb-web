import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";
import { FeatureTable, FeatureTableCell } from "typedb-web-schema";
import { FeatureTableCellComponent } from "../feature-table/feature-table-cell.component";

/** A text-led comparison table: row headings on the left, one column per product, with TypeDB's column highlighted */
@Component({
    selector: "td-compare-table",
    templateUrl: "compare-table.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [FeatureTableCellComponent],
})
export class CompareTableComponent {
    @Input({ required: true }) table!: FeatureTable;
    @Input() sectionId = "";
    @Input() size: "default" | "compact" = "default";

    isTypeDB(columnIndex: number): boolean {
        return /^typedb\b/i.test(this.table.products[columnIndex]?.name || "");
    }

    isText(cell: FeatureTableCell): cell is string {
        return typeof cell === "string";
    }
}

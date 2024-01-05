import { NgClass, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { FeatureTable, FeatureTableCell, LinkButton } from "typedb-web-schema";

import { ButtonComponent } from "../button/button.component";
import { InfoButtonComponent } from "../info-button/info-button.component";

@Component({
    selector: "td-feature-table-cell",
    templateUrl: "feature-table-cell.component.html",
    styleUrls: ["./feature-table-cell.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, NgIf, MatIconModule, ButtonComponent],
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

@Component({
    selector: "td-feature-table",
    templateUrl: "feature-table.component.html",
    styleUrls: ["./feature-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, NgIf, InfoButtonComponent, FeatureTableCellComponent],
})
export class FeatureTableComponent {
    @Input() table!: FeatureTable;
}

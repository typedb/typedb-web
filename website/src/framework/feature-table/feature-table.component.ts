import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { FeatureTable, FeatureTableCell, LinkButton } from "typedb-web-schema";

import { ButtonComponent } from "../button/button.component";
import { InfoButtonComponent } from "../info-button/info-button.component";
import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-feature-table-cell",
    templateUrl: "feature-table-cell.component.html",
    styleUrls: ["./feature-table-cell.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, MatIconModule, ButtonComponent],
})
export class FeatureTableCellComponent {
    @Input({ required: true }) table!: FeatureTable;
    @Input({ required: true }) columnIndex!: number;
    @Input({ required: true }) cell!: FeatureTableCell;
    @Input({ required: true }) sectionId!: string;

    get booleanValue(): boolean | undefined {
        return typeof this.cell === "boolean" ? this.cell : undefined;
    }

    get stringValue(): string | undefined {
        return typeof this.cell === "string" ? this.cell : undefined;
    }

    get buttonValue(): LinkButton | undefined {
        return this.cell instanceof LinkButton ? this.cell : undefined;
    }

    buttonId(): string {
        return this.cell instanceof LinkButton ? sanitiseHtmlID(`${this.sectionId}_${this.table.products[this.columnIndex]}_${this.cell.text}`) : ``;
    }
}

@Component({
    selector: "td-feature-table",
    templateUrl: "feature-table.component.html",
    styleUrls: ["./feature-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [InfoButtonComponent, FeatureTableCellComponent, ButtonComponent],
})
export class FeatureTableComponent {
    @Input() table!: FeatureTable;
    @Input({ required: true }) sectionId!: string;
}

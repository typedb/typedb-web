import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { sanitiseHtmlID } from "typedb-web-common/lib";

import { FeatureTable, FeatureTableCell, LinkButton } from "typedb-web-schema";

import { ButtonComponent } from "../button/button.component";
import { InfoButtonComponent } from "../info-button/info-button.component";
import { FeatureTableCellComponent } from "./feature-table-cell.component";

@Component({
    selector: "td-feature-table",
    templateUrl: "feature-table.component.html",
    styleUrls: ["./feature-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InfoButtonComponent, FeatureTableCellComponent, ButtonComponent]
})
export class FeatureTableComponent {
    @Input() table!: FeatureTable;
    @Input({ required: true }) sectionId!: string;
    @HostBinding("class") clazz = "section";
}

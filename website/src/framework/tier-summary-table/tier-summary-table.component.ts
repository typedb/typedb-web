import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { TierSummaryTable } from "typedb-web-schema";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-tier-summary-table",
    templateUrl: "tier-summary-table.component.html",
    styleUrls: ["./tier-summary-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RichTextComponent
    ],
})
export class TierSummaryTableComponent {
    @Input() table!: TierSummaryTable;
}

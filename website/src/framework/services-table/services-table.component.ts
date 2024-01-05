import { NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { ServicesKeyPoint } from "typedb-web-schema";

import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-services-table",
    templateUrl: "services-table.component.html",
    styleUrls: ["./services-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, RichTextComponent, NgIf, MatIconModule],
})
export class ServicesTableComponent {
    @Input() keyPoints!: ServicesKeyPoint[];
}

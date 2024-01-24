
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
    imports: [RichTextComponent, MatIconModule],
})
export class ServicesTableComponent {
    @Input() keyPoints!: ServicesKeyPoint[];
}

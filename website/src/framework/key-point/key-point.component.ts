import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { KeyPointWithIcon } from "typedb-web-schema";

import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-key-point-table",
    templateUrl: "key-point-table.component.html",
    styleUrls: ["./key-point-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RichTextComponent]
})
export class KeyPointTableComponent {
    @Input() keyPoints!: KeyPointWithIcon[];
}

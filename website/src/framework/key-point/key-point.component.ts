import { NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { KeyPoint, KeyPointWithIcon } from "typedb-web-schema";

import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-key-point-panels-2x2",
    templateUrl: "key-point-panels-2x2.component.html",
    styleUrls: ["./key-point-panels-2x2.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, RichTextComponent],
})
export class KeyPointPanels2x2Component {
    @Input() keyPoints!: KeyPoint[];
}

@Component({
    selector: "td-key-point-table",
    templateUrl: "key-point-table.component.html",
    styleUrls: ["./key-point-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, RichTextComponent],
})
export class KeyPointTableComponent {
    @Input() keyPoints!: KeyPointWithIcon[];
}

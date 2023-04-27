import { Component, Input } from "@angular/core";
import { KeyPoint } from "typedb-web-schema";

@Component({
    selector: "td-key-point-panels-3x1",
    templateUrl: "key-point-panels-3x1.component.html",
    styleUrls: ["./key-point-panels-3x1.component.scss"],
})
export class KeyPointPanels3x1Component {
    @Input() keyPoints!: KeyPoint[];
}

@Component({
    selector: "td-key-point-panels-2x2",
    templateUrl: "key-point-panels-2x2.component.html",
    styleUrls: ["./key-point-panels-2x2.component.scss"],
})
export class KeyPointPanels2x2Component {
    @Input() keyPoints!: KeyPoint[];
}

@Component({
    selector: "td-key-point-table",
    templateUrl: "key-point-table.component.html",
    styleUrls: ["./key-point-table.component.scss"],
})
export class KeyPointTableComponent {
    @Input() keyPoints!: KeyPoint[];
}

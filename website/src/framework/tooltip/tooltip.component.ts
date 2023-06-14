import { Component, Input } from "@angular/core";

@Component({
    selector: "td-tooltip",
    templateUrl: "tooltip.component.html",
    styleUrls: ["./tooltip.component.scss"],
})
export class TooltipComponent {
    @Input() text!: string;
    @Input() visible!: boolean;
}

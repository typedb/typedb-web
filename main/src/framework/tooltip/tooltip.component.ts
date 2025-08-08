import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "td-tooltip",
    templateUrl: "tooltip.component.html",
    styleUrls: ["./tooltip.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TooltipComponent {
    @Input() text!: string;
    @Input() visible!: boolean;
}

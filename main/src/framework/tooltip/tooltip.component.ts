import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "td-tooltip",
    templateUrl: "tooltip.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
})
export class TooltipComponent {
    @Input() text!: string;
    @Input() visible!: boolean;
}

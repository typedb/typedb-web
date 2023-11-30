import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "td-info-button",
    templateUrl: "info-button.component.html",
    styleUrls: ["./info-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoButtonComponent {
    @Input() tooltipText!: string;

    hovered = false;
    focused = false;
}

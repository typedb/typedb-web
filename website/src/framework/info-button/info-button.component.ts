import { Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: "td-info-button",
    templateUrl: "info-button.component.html",
    styleUrls: ["./info-button.component.scss"],
})
export class InfoButtonComponent {
    @Input() tooltipText!: string;

    hovered: boolean = false;
    focused: boolean = false;
}

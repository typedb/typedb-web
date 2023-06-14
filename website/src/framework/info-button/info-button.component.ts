import { Component, Input } from "@angular/core";

@Component({
    selector: "td-info-button",
    templateUrl: "info-button.component.html",
    styleUrls: ["./info-button.component.scss"],
})
export class InfoButtonComponent {
    @Input() tooltipText!: string;

    tooltipVisible: boolean = false;


}

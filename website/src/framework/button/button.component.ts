import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Action, ButtonStyle } from "typedb-web-schema";

@Component({
    selector: "td-button",
    templateUrl: "button.component.html",
    styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
    @Input() button!: Action | CustomAction;
    @Input() buttonWidth?: string;
    @Output() buttonClick = new EventEmitter();

    onClick() {
        this.buttonClick.emit();
    }
}

export interface CustomAction {
    buttonStyle: ButtonStyle;
    text: string;
}

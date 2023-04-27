import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LinkButton, ActionButton } from "typedb-web-schema";

@Component({
    selector: "td-button",
    templateUrl: "button.component.html",
    styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
    @Input() button!: ActionButton;
    @Input() buttonWidth?: string;
    @Input() size: "medium" | "small" = "medium";
    @Output() buttonClick = new EventEmitter();

    get linkButton(): LinkButton | undefined {
        return this.button instanceof LinkButton ? this.button : undefined;
    }

    get rootNgClass(): { [key: string]: boolean } {
        return {
            "bt-size-s": this.size === "small",
        };
    }

    onClick(event: Event) {
        event.preventDefault();
        this.buttonClick.emit();
    }
}

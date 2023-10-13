import { Component, Input } from "@angular/core";

import { ActionButton, LinkButton } from "typedb-web-schema";

@Component({
    selector: "td-button",
    templateUrl: "button.component.html",
    styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
    @Input() button!: ActionButton;
    @Input() buttonWidth?: string;
    @Input() size: "medium" | "small" = "medium";
    @Input() noComingSoonTooltip = false;
    @Input() containerHovered = false;

    comingSoonPopupVisible = false;

    get isDisabled(): boolean {
        return this.linkButton?.comingSoon || !this.linkButton?.link;
    }

    get linkButton(): LinkButton | undefined {
        return this.button instanceof LinkButton ? this.button : undefined;
    }

    get rootNgClass(): { [key: string]: boolean } {
        return {
            [this.button.style]: true,
            "td-button-size-s": this.size === "small",
            "td-button-disabled": this.button.comingSoon,
            "container-hover": this.containerHovered,
        };
    }

    onMouseEnter(_event: Event) {
        if (this.button.comingSoon) this.comingSoonPopupVisible = true;
    }

    onMouseLeave(_event: Event) {
        if (this.button.comingSoon) this.comingSoonPopupVisible = false;
    }
}

import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

import { TooltipComponent } from "../tooltip/tooltip.component";

@Component({
    selector: "td-info-button",
    templateUrl: "info-button.component.html",
    styleUrls: ["./info-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, MatIconModule, MatTooltipModule]
})
export class InfoButtonComponent {
    @Input() tooltipText!: string;

    hovered = false;
    focused = false;
}

import { NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ActionButton } from "typedb-web-schema";

import { ButtonComponent } from "../button/button.component";

@Component({
    selector: "td-actions",
    templateUrl: "actions.component.html",
    styleUrls: ["./actions.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, ButtonComponent],
})
export class ActionsComponent {
    @Input() actions?: ActionButton[];
}

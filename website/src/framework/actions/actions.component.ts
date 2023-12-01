import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ActionButton } from "typedb-web-schema";

@Component({
    selector: "td-actions",
    templateUrl: "actions.component.html",
    styleUrls: ["./actions.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
    @Input() actions?: ActionButton[];
}

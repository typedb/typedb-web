
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ActionButton } from "typedb-web-schema";

import { ButtonComponent } from "../button/button.component";
import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-actions",
    templateUrl: "actions.component.html",
    styleUrls: ["./actions.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonComponent],
})
export class ActionsComponent {
    @Input() actions?: ActionButton[];
    @Input({ required: true }) sectionId?: string;

    linkId(action: ActionButton): string {
        return sanitiseHtmlID(`${this.sectionId}_${action.text}`);
    }
}


import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { sanitiseHtmlID } from "typedb-web-common/lib";

import { ActionButton } from "typedb-web-schema";

import { ButtonComponent } from "../button/button.component";

@Component({
    selector: "td-actions",
    templateUrl: "actions.component.html",
    styleUrls: ["./actions.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent]
})
export class ActionsComponent {
    @Input() actions?: ActionButton[];
    @Input({ required: true }) sectionId?: string;

    linkId(action: ActionButton): string {
        return sanitiseHtmlID(`${this.sectionId}_${action.text}`);
    }
}

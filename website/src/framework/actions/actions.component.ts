import { Component, Input } from "@angular/core";
import { Action } from "typedb-web-schema";
import { CustomAction } from "../button/button.component";

@Component({
    selector: "td-actions",
    templateUrl: "actions.component.html",
    styleUrls: ["./actions.component.scss"],
})
export class ActionsComponent {
    @Input() actions?: (Action | CustomAction)[];
}

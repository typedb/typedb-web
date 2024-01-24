
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ConclusionPanel } from "typedb-web-schema";

import { ActionsComponent } from "../actions/actions.component";
import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-conclusion-panel",
    templateUrl: "conclusion-panel.component.html",
    styleUrls: ["conclusion-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RichTextComponent, ActionsComponent, LinkDirective],
})
export class ConclusionPanelComponent {
    @Input() panel!: ConclusionPanel;
}

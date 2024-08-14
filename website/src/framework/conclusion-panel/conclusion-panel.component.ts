
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ConclusionPanel, TextLink } from "typedb-web-schema";

import { ActionsComponent } from "../actions/actions.component";
import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";
import { sanitiseHtmlID } from "../util";

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
    sectionId = "conclusion-panel";

    resourceLinkId(resourceLink: TextLink) {
        return sanitiseHtmlID(`${this.sectionId}_${resourceLink.text}`);
    }
}


import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { sanitiseHtmlID } from "typedb-web-common/lib";

import { ConclusionPanel, TextLink } from "typedb-web-schema";

import { ActionsComponent } from "../actions/actions.component";
import { IllustrationComponent } from "../illustration/illustration.component";
import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-conclusion-panel",
    templateUrl: "conclusion-panel.component.html",
    styleUrls: ["conclusion-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RichTextComponent, ActionsComponent, LinkDirective, IllustrationComponent]
})
export class ConclusionPanelComponent {
    @Input() panel!: ConclusionPanel;
    sectionId = "conclusion-panel";
    @HostBinding("class.section") hasSectionClass = true;
    @HostBinding("class.narrow-section") hasNarrowSectionClass = true;

    resourceLinkId(resourceLink: TextLink) {
        return sanitiseHtmlID(`${this.sectionId}_${resourceLink.text}`);
    }
}


import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { sanitiseHtmlID } from "typedb-web-common/lib";

import { LinkPanel, TextLink } from "typedb-web-schema";
import { LinkDirective } from "../../link/link.directive";
import { RichTextComponent } from "../../text/rich-text.component";

@Component({
    selector: "td-simple-link-panels",
    templateUrl: "simple-link-panels.component.html",
    styleUrls: ["simple-link-panels.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LinkDirective, RichTextComponent]
})
export class SimpleLinkPanelsComponent {
    @Input() panels!: TextLink[];
    @Input({ required: true }) sectionId!: string;
    @HostBinding("class") clazz = "section";

    panelID(panel: TextLink) {
        return `${this.sectionId}_${sanitiseHtmlID(panel.text)}`;
    }
}

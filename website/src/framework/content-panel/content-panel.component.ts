import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { CodeSnippet, ContentTextPanel, LinkButton } from "typedb-web-schema";

import { AspectRatioComponent } from "../aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../button/button.component";
import { IllustrationComponent } from "../illustration/illustration.component";
import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-content-panel",
    templateUrl: "content-panel.component.html",
    styleUrls: ["content-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IllustrationComponent, AspectRatioComponent, RichTextComponent, LinkDirective, ButtonComponent],
})
export class ContentPanelComponent {
    @Input() @HostBinding("hidden") hidden?: boolean;
    @Input() panel!: ContentTextPanel;
    @HostBinding("class") clazz = `card`;

    get actionButton(): LinkButton {
        return new LinkButton({
            link: this.panel.learnMoreLink,
            style: "secondary",
            text: this.panel.learnMoreLinkText,
            comingSoon: false
        });
    }

    illustrationIsCodeSnippet() {
        return this.panel.illustration instanceof CodeSnippet;
    }
}

import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { CodeSnippet, ContentTextPanel, ContentTextTab } from "typedb-web-schema";

import { AspectRatioComponent } from "../aspect-ratio/aspect-ratio.component";
import { IllustrationComponent } from "../illustration/illustration.component";
import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-content-panel",
    templateUrl: "content-panel.component.html",
    styleUrls: ["content-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, IllustrationComponent, AspectRatioComponent, RichTextComponent, LinkDirective],
})
export class ContentPanelComponent {
    @Input() hidden?: boolean;
    @Input() panel!: ContentTextPanel;

    get contentTextPanel(): ContentTextPanel | undefined {
        return this.panel instanceof ContentTextPanel ? this.panel : undefined;
    }

    get rootNgClass(): { [clazz: string]: boolean | undefined } {
        return {
            section: true,
            card: true,
            "cp-root": true,
            "cp-in-tab": this.panel instanceof ContentTextTab,
        };
    }

    illustrationIsCodeSnippet() {
        return this.panel.illustration instanceof CodeSnippet;
    }
}

import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

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
    imports: [IllustrationComponent, AspectRatioComponent, RichTextComponent, LinkDirective]
})
export class ContentPanelComponent {
    @Input() hidden?: boolean;
    @Input({ required: true }) panel!: ContentTextPanel;
    @Input({ required: true }) panelId!: string;
    @Input() appearance: "unadorned" | "card" = "unadorned";
    @Input() layout: "content-text" | "text-content" = "content-text";

    get contentTextPanel(): ContentTextPanel | undefined {
        return this.panel instanceof ContentTextPanel ? this.panel : undefined;
    }

    @HostBinding("class")
    get clazz() {
        return `section`
            + (this.appearance === "card" ? ` card` : ``)
            + (this.panel instanceof ContentTextTab ? ` cp-in-tab` : ``)
            + ` td-layout-${this.layout}`;
    }

    @HostBinding("attr.hidden")
    get hiddenAttr() {
        return this.hidden ? true : undefined;
    }

    get learnMoreLinkId(): string | undefined {
        return `${this.panelId}_learn-more`;
    }

    illustrationIsCodeSnippet() {
        return this.panel.illustration instanceof CodeSnippet;
    }
}

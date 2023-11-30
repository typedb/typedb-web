import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { CodeSnippet, ContentTextPanel } from "typedb-web-schema";

@Component({
    selector: "td-content-panel",
    templateUrl: "content-panel.component.html",
    styleUrls: ["content-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        };
    }

    illustrationIsCodeSnippet() {
        return this.panel.illustration instanceof CodeSnippet;
    }
}

import { Component, Input } from "@angular/core";
import { ContentPanel, ContentTextPanel } from "typedb-web-schema";

@Component({
    selector: "td-content-panel",
    templateUrl: "content-panel.component.html",
    styleUrls: ["content-panel.component.scss"],
})
export class ContentPanelComponent {
    @Input() hidden?: boolean;
    @Input() panel!: ContentPanel;
    @Input() orientation: "landscape" | "portrait" = "landscape";
    @Input() textFirst?: boolean;
    @Input() size: "m" | "l" = "l";
    @Input() position: "embedded" | "standalone" = "embedded";

    public ngDoCheck() {
        console.log('doCheck', Zone.currentTask!.source);
    }

    get contentTextPanel(): ContentTextPanel | undefined {
        return this.panel instanceof ContentTextPanel ? this.panel : undefined;
    }

    get rootNgClass(): { [clazz: string]: boolean | undefined } {
        return {
            "section": true,
            "cp-root": true,
            [this.orientation]: true,
            "content-first": !this.textFirst,
            "text-first": this.textFirst,
            [`size-${this.size}`]: true,
            [this.position]: true,
        };
    }

    get graphicNgClass(): { [clazz: string]: boolean | undefined } {
        return {
            "flex-2": this.size === "l",
            "flex-1": this.size === "m",
        };
    }
}

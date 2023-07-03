import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, Input, OnInit } from "@angular/core";
import { ContentTextPanel } from "typedb-web-schema";

@Component({
    selector: "td-content-panel",
    templateUrl: "content-panel.component.html",
    styleUrls: ["content-panel.component.scss"],
})
export class ContentPanelComponent implements OnInit {
    @Input() hidden?: boolean;
    @Input() panel!: ContentTextPanel;
    @Input() orientation: "landscape" | "portrait" = "landscape";
    @Input() textFirst?: boolean;
    @Input() size: "m" | "l" = "l";
    @Input() position: "embedded" | "standalone" = "embedded";
    isMobile = false;

    constructor(private _breakpointObserver: BreakpointObserver) {}

    public ngOnInit() {
        this._breakpointObserver.observe(["(max-width:767px)"]).subscribe((state) => { this.isMobile = state.matches; });
    }

    get contentTextPanel(): ContentTextPanel | undefined {
        return this.panel instanceof ContentTextPanel ? this.panel : undefined;
    }

    get rootNgClass(): { [clazz: string]: boolean | undefined } {
        return {
            "section": true,
            "card": true,
            "card-padding": true,
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

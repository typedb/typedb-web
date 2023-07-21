import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ContentTextPanel } from "typedb-web-schema";
import { MediaQueryService } from "../../service/media-query.service";

@Component({
    selector: "td-content-panel",
    templateUrl: "content-panel.component.html",
    styleUrls: ["content-panel.component.scss"],
})
export class ContentPanelComponent implements OnInit, OnDestroy {
    @Input() hidden?: boolean;
    @Input() panel!: ContentTextPanel;
    @Input() orientation: "landscape" | "portrait" = "landscape";
    @Input() textFirst?: boolean;
    @Input() size: "m" | "l" = "l";
    @Input() position: "embedded" | "standalone" = "embedded";
    isMobile = false;

    private mediaQuerySubscription = Subscription.EMPTY;

    constructor(private _mediaQuery: MediaQueryService) {}

    ngOnInit() {
        this.mediaQuerySubscription = this._mediaQuery.isMobile.subscribe((isMobile) => {
            this.isMobile = isMobile;
        });
    }

    ngOnDestroy(): void {
        this.mediaQuerySubscription.unsubscribe();
    }

    get contentTextPanel(): ContentTextPanel | undefined {
        return this.panel instanceof ContentTextPanel ? this.panel : undefined;
    }

    get rootNgClass(): { [clazz: string]: boolean | undefined } {
        return {
            section: true,
            card: true,
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

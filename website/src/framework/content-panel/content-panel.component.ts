import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ContentTextPanel } from "typedb-web-schema";
import { MediaQueryService } from "../../service/media-query.service";

@Component({
    selector: "td-content-panel",
    templateUrl: "content-panel.component.html",
    styleUrls: ["content-panel.component.scss"],
})
export class ContentPanelComponent {
    @Input() hidden?: boolean;
    @Input() panel!: ContentTextPanel;
    isMobile$: Observable<boolean>;

    constructor(mediaQuery: MediaQueryService) {
        this.isMobile$ = mediaQuery.isMobile;
    }

    get contentTextPanel(): ContentTextPanel | undefined {
        return this.panel instanceof ContentTextPanel ? this.panel : undefined;
    }

    get rootNgClass(): { [clazz: string]: boolean | undefined } {
        return {
            section: true,
            "card": true,
            "cp-root": true,
        };
    }
}

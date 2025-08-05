import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { Organisation } from "typedb-web-schema";
import { MediaQueryService } from "../../service/media-query.service";
import { ScrollPaneComponent } from "../scroll-pane/scroll-pane.component";

// TODO: currently only behaves properly when all uploaded images are the same size
@Component({
    selector: "td-organisation-logos",
    templateUrl: "organisation-logos.component.html",
    styleUrls: ["organisation-logos.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class OrganisationLogosComponent {
    @Input() organisations!: Organisation[];
    @Input() appearance: "transparent" | "panel" = "transparent";
    isMobile = false;

    constructor(private media: MediaQueryService) {
        this.media.isMobile$.subscribe(isMobile => { this.isMobile = isMobile; });
    }

    get rootWidth() {
        if (this.isMobile) {
            return `${this.organisations.length * 240}px`;
        } else {
            return `${this.organisations.length * 260}px`;
        }
    }
}

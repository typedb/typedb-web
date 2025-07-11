import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { Organisation } from "typedb-web-schema";
import { ScrollShadowComponent } from "../scroll-shadow/scroll-shadow.component";

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

    get rootWidth() {
        return `${this.organisations.length * 260}px`;
    }
}

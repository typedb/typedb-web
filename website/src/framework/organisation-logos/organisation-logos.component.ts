import { NgClass, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { Organisation } from "typedb-web-schema";

// TODO: currently only behaves properly when all uploaded images are the same size
@Component({
    selector: "td-organisation-logos",
    templateUrl: "organisation-logos.component.html",
    styleUrls: ["organisation-logos.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, NgFor],
})
export class OrganisationLogosComponent {
    @Input() organisations!: Organisation[];
    @Input() appearance: "transparent" | "panel" = "transparent";
}

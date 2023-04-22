import { Component, Input } from "@angular/core";
import { Organisation } from "typedb-web-schema";

@Component({
    selector: "td-organisation-logos",
    templateUrl: "organisation-logos.component.html",
    styleUrls: ["organisation-logos.component.scss"],
})
export class OrganisationLogosComponent {
    @Input() organisations!: Organisation[];
    @Input() appearance: "transparent" | "panel" = "transparent";
}

import { Component, Input } from "@angular/core";
import { LinkPanel } from "typedb-web-schema";

@Component({
    selector: "td-link-panels",
    templateUrl: "link-panels.component.html",
    styleUrls: ["link-panels.component.scss"],
})
export class LinkPanelsComponent {
    @Input() panels!: LinkPanel[];
}

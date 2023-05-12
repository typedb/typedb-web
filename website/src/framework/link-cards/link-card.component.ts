import { Component, Input } from "@angular/core";
import { LinkPanel } from "typedb-web-schema";

@Component({
    selector: "td-link-cards",
    templateUrl: "link-card.component.html",
    styleUrls: ["link-card.component.scss"],
})
export class LinkCardComponent {
    @Input() cards!: LinkPanel[];
    @Input() cols!: 3 | 4;
}

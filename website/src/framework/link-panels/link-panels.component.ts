import { Component, Input } from "@angular/core";
import { LinkPanel, ProductPanel, Webinar } from "typedb-web-schema";

@Component({
    selector: "td-link-panels",
    templateUrl: "link-panels.component.html",
    styleUrls: ["link-panels.component.scss"],
})
export class LinkPanelsComponent {
    // TODO: when hovering the panel, also highlight the button
    @Input() panels!: LinkPanel[];
    @Input() cols!: 3 | 4;
    @Input() ctaStrength: "weak" | "strong" = "weak";
}

@Component({
    selector: "td-product-panels",
    templateUrl: "product-panels.component.html",
    styleUrls: ["product-panels.component.scss"],
})
export class ProductPanelsComponent {
    @Input() panels!: ProductPanel[];
}

@Component({
    selector: "td-webinar-panels",
    templateUrl: "webinar-panels.component.html",
    styleUrls: ["webinar-panels.component.scss"],
})
export class WebinarPanelsComponent {
    @Input() webinars!: Webinar[];
}

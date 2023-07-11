import { Component, Input } from "@angular/core";
import { SiteBanner } from "typedb-web-schema";

@Component({
    selector: "td-site-banner",
    templateUrl: "./site-banner.component.html",
    styleUrls: ["./site-banner.component.scss"],
})
export class SiteBannerComponent {
    @Input() banner!: SiteBanner;
}

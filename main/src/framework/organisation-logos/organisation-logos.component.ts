import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { Organisation, OrganisationRow } from "typedb-web-schema";

// Logos are sized to cover roughly equal areas, so a square mark and a long wordmark carry similar weight:
// height = sqrt(area / aspect ratio), where a logo four times as wide as it is tall is 32px tall
const LOGO_AREA = 4 * 32 * 32;
const LOGO_MIN_HEIGHT = 20;
const LOGO_MAX_HEIGHT = 56;
const DEFAULT_ASPECT_RATIO = 4;

/** Static rows of organisations, each shown as logos or as names, optionally under a labelled divider */
@Component({
    selector: "td-organisation-logos",
    templateUrl: "organisation-logos.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class OrganisationLogosComponent {
    @Input() rows: OrganisationRow[] = [];

    @HostBinding("class") readonly clazz = "section wide-section";

    logoHeight(organisation: Organisation): number {
        const height = Math.sqrt(LOGO_AREA / (organisation.logoAspectRatio || DEFAULT_ASPECT_RATIO)) * organisation.logoScale;
        return Math.round(Math.min(LOGO_MAX_HEIGHT, Math.max(LOGO_MIN_HEIGHT, height)));
    }
}

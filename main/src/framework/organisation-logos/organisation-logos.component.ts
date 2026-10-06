import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { OrganisationRow } from "typedb-web-schema";

/** Static rows of organisations, each shown as logos or as names, optionally under a labelled divider */
@Component({
    selector: "td-organisation-logos",
    templateUrl: "organisation-logos.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class OrganisationLogosComponent {
    @Input() rows: OrganisationRow[] = [];

    @HostBinding("class") readonly clazz = "section";
}

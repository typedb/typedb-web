import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { IntegrationsGridSection } from "typedb-web-schema";
import { LinkDirective } from "../link/link.directive";

@Component({
    selector: "td-integrations-grid",
    templateUrl: "./integrations-grid.component.html",
    styleUrls: ["./integrations-grid.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [LinkDirective],
})
export class IntegrationsGridComponent {
    @Input({ required: true }) integrations!: IntegrationsGridSection;
    @HostBinding("class.narrow-section") hasNarrowSectionClass = true;
}

import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { IntegrationsGridSection } from "typedb-web-schema";
import { LinkDirective } from "../link/link.directive";

@Component({
    selector: "td-integrations-grid",
    templateUrl: "./integrations-grid.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinkDirective, NgOptimizedImage],
})
export class IntegrationsGridComponent {
    @Input({ required: true }) integrations!: IntegrationsGridSection;
    @HostBinding("class.narrow-section") hasNarrowSectionClass = true;
}

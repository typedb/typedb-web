import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { ClosingPanelSection } from "typedb-web-schema";
import { LinkDirective } from "../link/link.directive";
import { SectionCoreComponent } from "../section/section-core.component";

/** A tinted panel holding the section's title, body and actions, with columns under a divider at its foot */
@Component({
    selector: "td-closing-panel-section",
    templateUrl: "closing-panel-section.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [LinkDirective, SectionCoreComponent],
})
export class ClosingPanelSectionComponent {
    @Input({ required: true }) section!: ClosingPanelSection;

    @HostBinding("class") readonly clazz = "section";
}

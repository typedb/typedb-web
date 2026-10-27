import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { CompareChoiceSection } from "typedb-web-schema";
import { SectionCoreComponent } from "../section/section-core.component";

/** "Choose X if" beside a highlighted "Choose TypeDB if", with an optional aside underneath */
@Component({
    selector: "td-compare-choice-section",
    templateUrl: "compare-choice-section.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [SectionCoreComponent],
})
export class CompareChoiceSectionComponent {
    @Input({ required: true }) section!: CompareChoiceSection;

    @HostBinding("class") readonly clazz = "section";
}

import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { CompareFeatureSection } from "typedb-web-schema";
import { IllustrationComponent } from "../illustration/illustration.component";
import { SectionCoreComponent } from "../section/section-core.component";
import { RichTextComponent } from "../text/rich-text.component";
import { CompareTableComponent } from "./compare-table.component";

/** One feature compared: eyebrow, title and body on the left; cards, tables, stats and notes on the right */
@Component({
    selector: "td-compare-feature-section",
    templateUrl: "compare-feature-section.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CompareTableComponent, IllustrationComponent, RichTextComponent, SectionCoreComponent],
})
export class CompareFeatureSectionComponent {
    @Input({ required: true }) section!: CompareFeatureSection;

    @HostBinding("class") readonly clazz = "section";
}

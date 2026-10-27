import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { CompareFeatureSection } from "typedb-web-schema";
import { IllustrationComponent } from "../illustration/illustration.component";
import { SectionCoreComponent } from "../section/section-core.component";
import { RichTextComponent } from "../text/rich-text.component";
import { CompareTableComponent } from "./compare-table.component";

/** One feature compared: eyebrow, title and body beside (or above) cards, tables, stats and notes */
@Component({
    selector: "td-compare-feature-section",
    templateUrl: "compare-feature-section.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CompareTableComponent, IllustrationComponent, RichTextComponent, SectionCoreComponent],
})
export class CompareFeatureSectionComponent {
    @Input({ required: true }) section!: CompareFeatureSection;

    @HostBinding("class") get clazz() {
        const layout = this.section.layoutDirection === "auto" ? "row" : this.section.layoutDirection;
        return `section cf-layout-${layout}${this.section.width === "wide" ? " wide-section" : ""}`;
    }

    @HostBinding("attr.id") get id() {
        return this.section.sectionId;
    }
}

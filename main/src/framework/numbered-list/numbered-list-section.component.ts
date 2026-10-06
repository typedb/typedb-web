import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { NumberedListSection } from "typedb-web-schema";
import { SectionCoreComponent } from "../section/section-core.component";
import { RichTextComponent } from "../text/rich-text.component";

/** The section's eyebrow and title on the left; its body and a divided, numbered list on the right */
@Component({
    selector: "td-numbered-list-section",
    templateUrl: "numbered-list-section.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [RichTextComponent, SectionCoreComponent],
})
export class NumberedListSectionComponent {
    @Input({ required: true }) section!: NumberedListSection;

    @HostBinding("class") readonly clazz = "section";

    number(index: number): string {
        return String(index + 1).padStart(2, "0");
    }
}

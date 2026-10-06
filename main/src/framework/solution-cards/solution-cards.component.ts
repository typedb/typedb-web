import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from "@angular/core";
import { SolutionCard } from "typedb-web-schema";
import { IconComponent, IconName } from "../icon/icon.component";
import { RichTextComponent } from "../text/rich-text.component";
import { ParagraphWithHighlightsComponent } from "../text/text-with-highlights.component";

/**
 * Cards that each describe a problem and, under a divider, the solution. The cards share grid rows
 * (CSS subgrid), so icons, titles, dividers and solutions line up across cards whatever their length.
 */
@Component({
    selector: "td-solution-cards",
    templateUrl: "solution-cards.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [IconComponent, ParagraphWithHighlightsComponent, RichTextComponent],
})
export class SolutionCardsComponent {
    @Input({ required: true }) cards!: SolutionCard[];

    @HostBinding("class") readonly clazz = "section";

    @HostBinding("style.--sc-columns") get columns() {
        return Math.min(Math.max(this.cards.length, 1), 4);
    }

    iconName(card: SolutionCard): IconName {
        return card.iconName as IconName;
    }
}

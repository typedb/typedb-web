import { ChangeDetectionStrategy, Component, HostBinding, Input, signal, ViewEncapsulation } from "@angular/core";
import { sanitiseHtmlID } from "typedb-web-common/lib";
import { SwitcherCard } from "typedb-web-schema";
import { SyntaxHighlightDirective } from "../code/syntax-highlight.directive";

/**
 * A numbered list of cards beside a panel that shows the selected card. Every panel is rendered up front
 * and hidden unless selected, so each code example is highlighted once and all content is in the prerendered page.
 */
@Component({
    selector: "td-card-switcher",
    templateUrl: "card-switcher.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [SyntaxHighlightDirective],
})
export class CardSwitcherComponent {
    @Input({ required: true }) cards!: SwitcherCard[];
    @Input({ required: true }) sectionId!: string;

    @HostBinding("class") readonly clazz = "section";

    readonly selectedIndex = signal(0);

    number(index: number): string {
        return String(index + 1).padStart(2, "0");
    }

    tabId(card: SwitcherCard): string {
        return `${this.sectionId}_tab_${sanitiseHtmlID(card.label)}`;
    }

    panelId(card: SwitcherCard): string {
        return `${this.sectionId}_panel_${sanitiseHtmlID(card.label)}`;
    }

    select(index: number): void {
        this.selectedIndex.set(index);
    }

    // Arrow keys move between cards, following the WAI-ARIA tabs pattern
    onKeydown(event: KeyboardEvent, index: number): void {
        const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
        const target = step !== undefined ? (index + step + this.cards.length) % this.cards.length
            : event.key === "Home" ? 0 : event.key === "End" ? this.cards.length - 1 : undefined;
        if (target === undefined) return;
        event.preventDefault();
        this.select(target);
        const tablist = (event.currentTarget as HTMLElement).parentElement;
        (tablist?.children[target] as HTMLElement | undefined)?.focus();
    }
}

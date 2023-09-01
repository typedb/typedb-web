import { Component, Input } from "@angular/core";
import { ParagraphWithHighlights } from "typedb-web-schema";

@Component({
    selector: "td-heading-with-highlights",
    templateUrl: "heading-with-highlights.component.html",
})
export class HeadingWithHighlightsComponent {
    @Input() level: "h1" | "h2" = "h2";
    @Input() value!: ParagraphWithHighlights;
    @Input() themeColorHex: string = "#02DAC9";
}

@Component({
    selector: "td-p-with-highlights",
    template:
        '<p [class]="rootClass"><span *ngFor="let span of value.spans" [ngStyle]="span.highlight ? { \'color\': themeColorHex } : undefined">{{ span.text }}</span></p>\n',
})
export class ParagraphWithHighlightsComponent {
    @Input() value!: ParagraphWithHighlights;
    @Input() themeColorHex: string = "#02DAC9";
    @Input() level: "p1" | "p2" = "p1";

    get rootClass(): string {
        return `text-${this.level}`;
    }
}

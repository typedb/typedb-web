import { Component, Input } from "@angular/core";

import { ParagraphWithHighlights } from "typedb-web-schema";

@Component({
    selector: "td-heading-with-highlights",
    templateUrl: "heading-with-highlights.component.html",
})
export class HeadingWithHighlightsComponent {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input("id") inputId?: string;
    @Input() level: "h1" | "h2" = "h2";
    @Input() value!: ParagraphWithHighlights;
    @Input() themeColorHex = "#02DAC9";

    get id(): string {
        return (
            this.inputId ||
            this.value.spans
                .map((v) => v.text)
                .join("")
                .toLocaleLowerCase()
                .replace(/ /g, "-")
                .replace(/[^0-9a-z-]/g, "")
        );
    }
}

@Component({
    selector: "td-p-with-highlights",
    template:
        '<p [class]="rootClass"><span *ngFor="let span of value.spans" [ngStyle]="span.highlight ? { \'color\': themeColorHex } : undefined">{{ span.text }}</span></p>\n',
})
export class ParagraphWithHighlightsComponent {
    @Input() value!: ParagraphWithHighlights;
    @Input() themeColorHex = "#02DAC9";
    @Input() level: "p1" | "p2" = "p1";

    get rootClass(): string {
        return `text-${this.level}`;
    }
}

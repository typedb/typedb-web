import { Component, Input } from "@angular/core";
import { ParagraphWithHighlights } from "typedb-web-schema";

@Component({
    selector: "td-h1-with-highlights",
    template: "<h1><span *ngFor=\"let span of value.spans\" [ngStyle]=\"span.highlight ? { 'color': themeColorHex } : undefined\">{{ span.text }}</span></h1>\n",
})
export class H1WithHighlightsComponent {
    @Input() value!: ParagraphWithHighlights;
    @Input() themeColorHex: string = "#02DAC9";
}

@Component({
    selector: "td-p-with-highlights",
    template: "<p><span *ngFor=\"let span of value.spans\" [ngStyle]=\"span.highlight ? { 'color': themeColorHex } : undefined\">{{ span.text }}</span></p>\n",
})
export class ParagraphWithHighlightsComponent {
    @Input() value!: ParagraphWithHighlights;
    @Input() themeColorHex: string = "#02DAC9";
}

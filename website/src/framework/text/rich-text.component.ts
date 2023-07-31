import { Component, Input } from "@angular/core";
import { RichText, RichTextSpan } from "typedb-web-schema";

@Component({
    selector: "td-rich-text",
    templateUrl: "rich-text.component.html",
    styleUrls: ["rich-text.component.scss"],
})
export class RichTextComponent {
    @Input() value!: RichText;

    private readonly markClasses = {
        em: "rt-em",
        strong: "rt-strong",
        underline: "rt-underline",
    };

    getSpanClasses(span: RichTextSpan) {
        return span.marks
            .filter((mark): mark is keyof typeof this.markClasses => mark in this.markClasses)
            .map((mark) => this.markClasses[mark]);
    }
}

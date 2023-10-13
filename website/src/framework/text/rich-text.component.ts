import { Component, Input } from "@angular/core";

import { RichText, RichTextSpan } from "typedb-web-schema";

@Component({
    selector: "td-rich-text",
    templateUrl: "rich-text.component.html",
    styleUrls: ["rich-text.component.scss"],
})
export class RichTextComponent {
    @Input() value!: RichText;
    @Input() level: "p1" | "p2" = "p2";

    get paragraphClass(): string {
        return this.level === "p1" ? "text-p1" : "text-p2";
    }

    getSpanClasses(span: RichTextSpan) {
        return span.marks.map((mark) => `rt-${mark}`);
    }

    isPlainTextSpan(span: RichTextSpan) {
        return !this.isListSpan(span) && !this.isCodeSpan(span);
    }

    isListSpan(span: RichTextSpan) {
        return span.level != undefined;
    }

    isCodeSpan(span: RichTextSpan) {
        return span.marks.includes("code");
    }
}

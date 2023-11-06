import { Pipe, PipeTransform } from "@angular/core";

import { ParagraphWithHighlights } from "typedb-web-schema";

@Pipe({
    name: "plainText",
})
export class PlainTextPipe implements PipeTransform {
    transform(value: ParagraphWithHighlights): string {
        return value ? value.spans.map((span) => span.text).join("") : "";
    }
}

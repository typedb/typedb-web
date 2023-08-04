import { Pipe, PipeTransform } from "@angular/core";
import { ParagraphWithHighlights, RichText } from "typedb-web-schema";

@Pipe({ name: "paragraphWithHighlights" })
export class ParagraphWithHighlightsPipe implements PipeTransform {
    transform(value: string): ParagraphWithHighlights {
        return value
            ? new ParagraphWithHighlights({ spans: [{ text: value, highlight: false }] })
            : new ParagraphWithHighlights({ spans: [] });
    }
}

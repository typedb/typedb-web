import { Pipe, PipeTransform } from "@angular/core";
import { RichText } from "typedb-web-schema";

@Pipe({ name: "richText" })
export class RichTextPipe implements PipeTransform {
    transform(value: string): RichText {
        return value ? new RichText({ paragraphs: [{ spans: [{ text: value, marks: [] }] }] }): new RichText({ paragraphs: [] });
    }
}

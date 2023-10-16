import { Pipe, PipeTransform } from "@angular/core";

import { toHTML } from "@portabletext/to-html";
import { PortableText } from "typedb-web-schema";

@Pipe({ name: "html" })
export class HtmlPipe implements PipeTransform {
    transform(value: PortableText): string {
        return toHTML(value);
    }
}

import { Pipe, PipeTransform } from "@angular/core";

import { toHTML } from "@portabletext/to-html";
import { PortableText } from "typedb-web-schema";

@Pipe({ name: "html" })
export class HtmlPipe implements PipeTransform {
    transform(value: PortableText): string {
        const initialHtmlString = toHTML(value);
        const element = new DOMParser().parseFromString(initialHtmlString, "text/html");
        const anchorEls = element.getElementsByTagName("a");
        for (const i in anchorEls) {
            if (!Object.hasOwn(anchorEls, i)) continue;
            const anchorEl = anchorEls[i];
            if (!anchorEl.href.startsWith(window.location.origin)) {
                anchorEl.target = "_blank";
            }
        }
        return element.body.innerHTML.toString();
    }
}

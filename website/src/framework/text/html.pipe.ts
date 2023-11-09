import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { toHTML } from "@portabletext/to-html";
import { PortableText } from "typedb-web-schema";

@Pipe({ name: "html" })
export class HtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(value: PortableText): SafeHtml {
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
        return this.sanitizer.bypassSecurityTrustHtml(element.body.innerHTML.toString());
    }
}

import { isPlatformBrowser } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { toHTML } from "@portabletext/to-html";
import { PortableText } from "typedb-web-schema";

@Pipe({
    name: "html",
    standalone: true,
})
export class HtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer, private platformId: Object) {}

    transform(value: PortableText): SafeHtml {
        const initialHtmlString = toHTML(value);

        if (!isPlatformBrowser(this.platformId)) {
            // Server-side: return sanitized HTML without DOM manipulation
            return this.sanitizer.bypassSecurityTrustHtml(initialHtmlString);
        }

        // Browser-side: perform DOM manipulation
        const parser = new DOMParser();
        const element = parser.parseFromString(initialHtmlString, "text/html");
        const anchorEls = element.getElementsByTagName("a");

        for (let i = 0; i < anchorEls.length; i++) {
            const anchorEl = anchorEls[i];
            const href = anchorEl.getAttribute('href'); // Use getAttribute instead of .href

            if (href && !href.startsWith(window.location.origin)) {
                anchorEl.setAttribute('target', '_blank'); // Use setAttribute instead of .target
            }
        }

        return this.sanitizer.bypassSecurityTrustHtml(element.body.innerHTML);
    }
}

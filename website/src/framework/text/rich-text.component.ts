import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { PortableText } from "typedb-web-schema";

import { HtmlPipe } from "./html.pipe";

@Component({
    selector: "td-rich-text",
    template: ``,
    styleUrls: ["rich-text.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextComponent {
    @Input() value!: string | PortableText;

    @HostBinding("innerHtml") get innerHtml(): SafeHtml {
        return typeof this.value === "string" ? this.value : new HtmlPipe(this.sanitizer).transform(this.value);
    }

    constructor(private sanitizer: DomSanitizer) {}
}

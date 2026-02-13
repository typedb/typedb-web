import { ChangeDetectionStrategy, Component, HostBinding, Input, inject, PLATFORM_ID, ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { PortableText } from "typedb-web-schema";

import { HtmlPipe } from "./html.pipe";

@Component({
    selector: "td-rich-text",
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
})
export class RichTextComponent {
    private readonly platformId = inject(PLATFORM_ID);
    @Input() value!: string | PortableText;

    @HostBinding("innerHtml") get innerHtml(): SafeHtml {
        return typeof this.value === "string"
            ? this.sanitizer.bypassSecurityTrustHtml(this.value)
            : new HtmlPipe(this.sanitizer, this.platformId).transform(this.value);
    }

    constructor(private sanitizer: DomSanitizer) {}
}

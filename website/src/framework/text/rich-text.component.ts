import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { PortableText } from "typedb-web-schema";

import { HtmlPipe } from "./html.pipe";

@Component({
    selector: "td-rich-text",
    template: "",
    styleUrls: ["rich-text.component.scss"],
})
export class RichTextComponent implements OnInit {
    @Input() value!: string | PortableText;
    @HostBinding("innerHtml") innerHtml!: SafeHtml;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.innerHtml =
            typeof this.value === "string" ? this.value : new HtmlPipe(this.sanitizer).transform(this.value);
    }
}

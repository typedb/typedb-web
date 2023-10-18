import { Component, HostBinding, Input } from "@angular/core";
import { PortableText } from "typedb-web-schema";
import { HtmlPipe } from "./html.pipe";

@Component({
    selector: "td-rich-text",
    template: "",
    styleUrls: ["rich-text.component.scss"],
})
export class RichTextComponent {
    @Input() value!: string | PortableText;

    @HostBinding("innerHtml")
    get innerHtml(): string {
        return typeof this.value === "string" ? this.value : new HtmlPipe().transform(this.value);
    }
}

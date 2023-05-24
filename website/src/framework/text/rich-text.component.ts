import { Component, Input } from "@angular/core";
import { RichText } from "typedb-web-schema";

@Component({
    selector: "td-rich-text",
    templateUrl: "rich-text.component.html",
    styleUrls: ["rich-text.component.scss"],
})
export class RichTextComponent {
    @Input() value!: RichText;
}

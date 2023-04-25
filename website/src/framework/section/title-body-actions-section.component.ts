import { Component, Input } from "@angular/core";
import { LinkButton, ParagraphWithHighlights, RichText } from "typedb-web-schema";

@Component({
    selector: "td-title-body-actions-section",
    templateUrl: "./title-body-actions-section.component.html",
})
export class TitleBodyActionsSectionComponent {
    @Input() title!: ParagraphWithHighlights;
    @Input() body!: RichText;
    @Input() actions?: LinkButton[];
    @Input() size: "m" | "l" = "l";

    get titleClass(): string {
        switch (this.size) {
            case "l": return "text-xxl";
            case "m": return "text-xl";
        }
    }

    get bodyClasses(): string {
        switch (this.size) {
            case "l": return "section-body-text subtitle-l text-l";
            case "m": return "section-body-text subtitle text-m";
        }
    }
}

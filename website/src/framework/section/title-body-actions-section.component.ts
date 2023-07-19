import { Component, Input } from "@angular/core";
import {
    LinkButton,
    ParagraphWithHighlights,
    RichText,
} from "typedb-web-schema";

@Component({
    selector: "td-title-body-actions-section",
    templateUrl: "./title-body-actions-section.component.html",
})
export class TitleBodyActionsSectionComponent {
    @Input() title!: ParagraphWithHighlights;
    @Input() body!: RichText;
    @Input() actions?: LinkButton[];
    @Input() size: "m" | "l" = "l";
    @Input() isIntroSection = false;

    get sectionClasses(): string {
        return this.isIntroSection
            ? "page-section page-intro-section"
            : "page-section";
    }

    get titleClass(): string {
        switch (this.size) {
            case "l":
                return "text-56-64 text-48-60-tablet text-28-36-mobile";
            case "m":
                return "text-xl";
        }
    }

    get bodyClasses(): string {
        switch (this.size) {
            case "l":
                return "narrow-section subtitle-l text-32-44 text-24-37-tablet text-16-24-mobile";
            case "m":
                return "narrow-section subtitle text-m";
        }
    }
}

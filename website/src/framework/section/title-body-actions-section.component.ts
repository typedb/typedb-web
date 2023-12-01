import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { LinkButton, ParagraphWithHighlights, PortableText } from "typedb-web-schema";

@Component({
    selector: "td-title-body-actions-section",
    templateUrl: "./title-body-actions-section.component.html",
    styleUrls: ["./title-body-actions-section.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBodyActionsSectionComponent {
    @Input() title!: ParagraphWithHighlights;
    @Input() body?: PortableText;
    @Input() actions?: LinkButton[];
    @Input() isIntroSection = false;

    get sectionClasses(): string {
        return this.isIntroSection ? "page-section page-intro-section" : "page-section";
    }
}

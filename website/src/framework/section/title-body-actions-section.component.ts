
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { LinkButton, ParagraphWithHighlights, PortableText } from "typedb-web-schema";

import { ActionsComponent } from "../actions/actions.component";
import { RichTextComponent } from "../text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../text/text-with-highlights.component";

@Component({
    selector: "td-title-body-actions-section",
    templateUrl: "./title-body-actions-section.component.html",
    styleUrls: ["./title-body-actions-section.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [HeadingWithHighlightsComponent, RichTextComponent, ActionsComponent],
})
export class TitleBodyActionsSectionComponent {
    @Input() title!: ParagraphWithHighlights;
    @Input() body?: PortableText;
    @Input() actions?: LinkButton[];
    @Input({ required: true }) sectionId!: string;
    @Input() isIntroSection = false;

    get sectionClasses(): string {
        return this.isIntroSection ? "page-intro-section" : "";
    }
}


import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { TitleBodyIllustrationSection } from "typedb-web-schema";
import { ActionsComponent } from "../../actions/actions.component";
import { IllustrationComponent } from "../../illustration/illustration.component";
import { RichTextComponent } from "../../text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../text/text-with-highlights.component";

@Component({
    selector: "td-title-body-illustration-section",
    templateUrl: "./title-body-illustration-section.component.html",
    styleUrls: ["./title-body-illustration-section.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HeadingWithHighlightsComponent, RichTextComponent, ActionsComponent, IllustrationComponent]
})
export class TitleBodyIllustrationSectionComponent {
    @Input({ required: true }) data!: TitleBodyIllustrationSection;
    @Input() level: "h1" | "h2" = "h2";
    @Input() flexDirection: "row" | "row-reverse" = "row";
    @Input() isIntroSection = false;

    get sectionClasses(): string {
        return `${this.isIntroSection ? "page-intro-section" : ""} td-${this.flexDirection}`;
    }
}

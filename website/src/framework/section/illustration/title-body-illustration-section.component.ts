
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

import { CodeSnippet, FeatureGridCell, PolyglotSnippet, TitleBodyIllustrationSection } from "typedb-web-schema";
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
    @Input() flexDirection: "row" | "row-reverse" | "column" = "row";
    @Input() isIntroSection = false;

    @HostBinding("class")
    get rootClasses(): string {
        return `section ${this.isIntroSection ? "page-intro-section" : ""} td-${this.flexDirection}`;
    }

    @HostBinding("class.has-code-snippet-illustration")
    get hasCodeSnippetIllustration() {
        return this.data.illustration instanceof CodeSnippet || this.data.illustration instanceof PolyglotSnippet;
    }
}

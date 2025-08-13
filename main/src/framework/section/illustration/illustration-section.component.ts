
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

import { CodeSnippet, FeatureGridCell, PolyglotSnippet, IllustrationSection, ImageIllustration } from "typedb-web-schema";
import { ActionsComponent } from "../../actions/actions.component";
import { IllustrationComponent } from "../../illustration/illustration.component";
import { RichTextComponent } from "../../text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../text/text-with-highlights.component";

@Component({
    selector: "td-illustration-section",
    templateUrl: "./illustration-section.component.html",
    styleUrls: ["./illustration-section.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HeadingWithHighlightsComponent, RichTextComponent, ActionsComponent, IllustrationComponent]
})
export class IllustrationSectionComponent {
    @Input({ required: true }) data!: IllustrationSection;
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

    @HostBinding("class.has-window-header")
    get hasWindowHeader() {
        return this.data.illustration instanceof ImageIllustration;
    }
}

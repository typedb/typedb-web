import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { CodeSnippet, PolyglotSnippet, IllustrationSection, ImageIllustration, SectionCore } from "typedb-web-schema";
import { ActionsComponent } from "../actions/actions.component";
import { IllustrationComponent } from "../illustration/illustration.component";
import { RichTextComponent } from "../text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../text/text-with-highlights.component";

@Component({
    selector: "td-section-core",
    templateUrl: "section-core.component.html",
    styleUrls: ["./section-core.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [HeadingWithHighlightsComponent, RichTextComponent, ActionsComponent, IllustrationComponent],
})
export class SectionCoreComponent {
    @Input() section!: SectionCore | IllustrationSection;
    @Input() level: "h1" | "h2" | "h3" = "h2";
    @Input() noBody?: boolean;
    @Input() noSectionClass?: boolean;
    @Input("textAlign") _textAlign?: "left" | "center";
    @Input() flexDirection: "row" | "row-reverse" | "column" = "column";
    @Input() isIntroSection = false;
    @Input() noWindowHeader = false;
    @Input() @HostBinding("class.has-peeking-bot") hasPeekingBot = false;
    themeColorHex = "#02DAC9";

    get textAlign(): "left" | "center" {
        return this._textAlign || (this.flexDirection === "column" ? "center" : "left");
    }

    @HostBinding("class")
    get clazz(): string {
        const baseClass = this.noSectionClass ? this.levelClass : `section ${this.levelClass} text-align-${this.textAlign}`;
        const introClass = this.isIntroSection ? "page-intro-section" : "";
        const flexClass = this.hasIllustration ? `td-${this.flexDirection}` : "";
        return `${baseClass} ${introClass} ${flexClass}`.trim();
    }

    @HostBinding("class.has-code-snippet-illustration")
    get hasCodeSnippetIllustration() {
        return this.hasIllustration && (this.illustration instanceof CodeSnippet || this.illustration instanceof PolyglotSnippet);
    }

    @HostBinding("class.has-window-header")
    get hasWindowHeader() {
        return this.hasIllustration && this.illustration instanceof ImageIllustration && !this.noWindowHeader;
    }

    get hasIllustration(): boolean {
        return 'illustration' in this.section && !!this.section.illustration;
    }

    get illustration() {
        return (this.section as IllustrationSection).illustration;
    }

    private get levelClass(): string {
        return `tb-level-${this.level}`;
    }
}

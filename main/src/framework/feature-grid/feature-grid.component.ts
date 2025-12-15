
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";
import { sanitiseHtmlID } from "typedb-web-common/lib";

import {
    CodeSnippet, CodeSnippetShort, FeatureGrid, FeatureGridCell, FeatureGridRow, GraphVisualisation, Illustration,
    ImageIllustration, PolyglotSnippet, SplitPaneIllustration, TextLink, VideoEmbed,
} from "typedb-web-schema";

import { AspectRatioComponent } from "../aspect-ratio/aspect-ratio.component";
import { SyntaxHighlightDirective } from "../code/syntax-highlight.directive";
import { IllustrationComponent } from "../illustration/illustration.component";
import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";
import { TagChipsComponent } from "./tag-chips.component";
import { HeadingWithHighlightsComponent } from "../text/text-with-highlights.component";

@Component({
    selector: "td-feature-grid",
    templateUrl: "./feature-grid.component.html",
    styleUrls: ["./feature-grid.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TagChipsComponent, RichTextComponent, LinkDirective, AspectRatioComponent, IllustrationComponent, HeadingWithHighlightsComponent, SyntaxHighlightDirective]
})
export class FeatureGridComponent {
    @Input() data!: FeatureGrid;
    @Input() illustration?: Illustration;
    @Input() disableCardAppearance = false;
    @Input({ required: true }) sectionId!: string;

    // @HostBinding("class") get classes() {
    //     return {
    //         section: !this.disableCardAppearance,
    //     };
    // }

    hasGraphVizIllustration(feature: FeatureGridCell) {
        return feature.illustration instanceof GraphVisualisation;
    }

    hasMediaIllustration(feature: FeatureGridCell) {
        return (
            feature.illustration instanceof ImageIllustration ||
            feature.illustration instanceof VideoEmbed ||
            feature.illustration instanceof SplitPaneIllustration
        );
    }

    hasCodeSnippetIllustration(feature: FeatureGridCell) {
        return feature.illustration instanceof CodeSnippet || feature.illustration instanceof PolyglotSnippet;
    }

    hasShortCodeSnippet(feature: FeatureGridCell) {
        return feature.illustration instanceof CodeSnippetShort;
    }

    writeToClipboard(ev: MouseEvent, code: string): void {
        const el = ev.currentTarget as HTMLButtonElement;
        window.navigator.clipboard.writeText(code).then(
            () => {
                el.classList.add("clicked");
                el.offsetHeight;
                el.classList.remove("clicked");
            },
            () => {
                /**/
            },
        );
    }

    linkId(feature: FeatureGridCell, link: TextLink): string {
        return `${this.sectionId}_${sanitiseHtmlID(feature.title || "untitled")}_${sanitiseHtmlID(link.text)}`;
    }

    getEffectiveLayoutDirection(feature: FeatureGridCell, row: FeatureGridRow): 'row' | 'column' {
        if (feature.layoutDirection === 'auto') {
            // Use existing logic: row layout for single cell rows, column for multiple cells
            return row.cells.length === 1 ? 'row' : 'column';
        }
        return feature.layoutDirection;
    }
}

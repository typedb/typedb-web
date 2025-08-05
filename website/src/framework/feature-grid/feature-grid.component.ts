
import { isPlatformBrowser } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, inject, PLATFORM_ID } from "@angular/core";
import { sanitiseHtmlID } from "typedb-web-common/lib";

import {
    CodeSnippet, CodeSnippetShort, FeatureGridCell, FeatureGridLayout, GraphVisualisation, Illustration,
    ImageIllustration, PolyglotSnippet, SplitPaneIllustration, TextLink, VideoEmbed,
} from "typedb-web-schema";

import { AspectRatioComponent } from "../aspect-ratio/aspect-ratio.component";
import { IllustrationComponent } from "../illustration/illustration.component";
import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";
import { TagChipsComponent } from "./tag-chips.component";

@Component({
    selector: "td-feature-grid",
    templateUrl: "./feature-grid.component.html",
    styleUrls: ["./feature-grid.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TagChipsComponent, RichTextComponent, LinkDirective, AspectRatioComponent, IllustrationComponent]
})
export class FeatureGridComponent implements OnInit, AfterViewInit {
    private readonly platformId = inject(PLATFORM_ID);
    @Input() layout!: FeatureGridLayout;
    @Input() featureRows!: FeatureGridCell[][];
    @Input() illustration?: Illustration;
    @Input() disableCardAppearance = false;
    @Input({ required: true }) sectionId!: string;

    @HostBinding("class") get classes() {
        return {
            "card-appearance": !this.disableCardAppearance,
            section: !this.disableCardAppearance,
            "narrow-section": !this.disableCardAppearance,
            ["fg-row-size-" + this.columnIndexes.length]: true,
        };
    }

    columnIndexes!: number[];

    ngOnInit() {
        this.columnIndexes = [...Array(this.featureRows[0].length).keys()];
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            (window as any)["Prism"].highlightAll();
        }
    }

    hasMediaIllustration(feature: FeatureGridCell) {
        return (
            feature.illustration instanceof ImageIllustration ||
            feature.illustration instanceof VideoEmbed ||
            feature.illustration instanceof GraphVisualisation ||
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
}

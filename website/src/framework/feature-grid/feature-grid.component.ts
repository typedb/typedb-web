import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from "@angular/core";

import Prism from "prismjs";
import {
    CodeSnippet,
    CodeSnippetShort,
    FeatureGridCell,
    FeatureGridLayout,
    GraphVisualisation,
    Illustration,
    ImageIllustration,
    PolyglotSnippet,
    SplitPaneIllustration,
    VideoEmbed,
} from "typedb-web-schema";

@Component({
    selector: "td-feature-grid",
    templateUrl: "./feature-grid.component.html",
    styleUrls: ["./feature-grid.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGridComponent implements OnInit, AfterViewInit {
    @Input() layout!: FeatureGridLayout;
    @Input() featureRows!: FeatureGridCell[][];
    @Input() illustration?: Illustration;
    @Input() disableCardAppearance = false;

    @HostBinding("class") get classes() {
        return {
            "card-appearance": !this.disableCardAppearance,
            section: !this.disableCardAppearance,
            ["fg-row-size-" + this.columnIndexes.length]: true,
        };
    }

    columnIndexes!: number[];

    ngOnInit() {
        this.columnIndexes = [...Array(this.featureRows[0].length).keys()];
    }

    ngAfterViewInit() {
        Prism.highlightAll();
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
}

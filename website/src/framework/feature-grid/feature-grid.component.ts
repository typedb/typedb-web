import { Component, Input } from "@angular/core";
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
})
export class FeatureGridComponent {
    @Input() layout!: FeatureGridLayout;
    @Input() featureRows!: FeatureGridCell[][];
    @Input() illustration?: Illustration;
    columnIndexes!: number[];

    ngOnInit() {
        this.columnIndexes = [...Array(this.featureRows[0].length).keys()];
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
}

import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Host, HostBinding, Input, NgZone, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import interact from "interactjs";
import { map, Observable } from "rxjs";
import {
    CodeSnippet, GraphVisualisation, Illustration, ImageIllustration, PolyglotSnippet, PortableText,
    SplitPaneIllustration, VideoEmbed,
} from "typedb-web-schema";

import { MediaQueryService } from "../../service/media-query.service";
import { AspectRatioComponent } from "../aspect-ratio/aspect-ratio.component";
import { CodeSnippetComponent } from "../code/code-snippet.component";
import { PolyglotSnippetComponent } from "../polyglot-snippet/polyglot-snippet.component";
import { GraphVisualisationComponent } from "../graph-visualisation/graph-visualisation.component";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-illustration",
    templateUrl: "illustration.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        CodeSnippetComponent, PolyglotSnippetComponent, GraphVisualisationComponent,
    ]
})
export class IllustrationComponent {
    @Input() illustration!: Illustration;
    // TODO: requiring the caller to set visible explicitly is counter-intuitive
    @Input() visible = true;
    @Input() @HostBinding("class.il-blur") isBlurred = false;

    @HostBinding("class.is-code-snippet")
    get isCodeSnippet() {
        return this.illustration instanceof CodeSnippet;
    }

    @HostBinding("class.is-typeql-snippet")
    get isTypeQLSnippet() {
        return this.illustration instanceof CodeSnippet && this.illustration.language === "typeql";
    }

    get imageIllustration(): ImageIllustration | undefined {
        return this.illustration instanceof ImageIllustration ? this.illustration : undefined;
    }

    get videoEmbed(): VideoEmbed | undefined {
        return this.illustration instanceof VideoEmbed ? this.illustration : undefined;
    }

    get codeSnippet(): CodeSnippet | undefined {
        return this.illustration instanceof CodeSnippet ? this.illustration : undefined;
    }

    get polyglotSnippet(): PolyglotSnippet | undefined {
        return this.illustration instanceof PolyglotSnippet ? this.illustration : undefined;
    }

    get graphVisualisation(): GraphVisualisation | undefined {
        return this.illustration instanceof GraphVisualisation ? this.illustration : undefined;
    }

    get splitPaneIllustration(): SplitPaneIllustration | undefined {
        return this.illustration instanceof SplitPaneIllustration ? this.illustration : undefined;
    }
}

@Component({
    selector: "td-captioned-illustration",
    templateUrl: "captioned-illustration.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [AspectRatioComponent, IllustrationComponent, RichTextComponent]
})
export class CaptionedIllustrationComponent {
    @Input() illustration!: Illustration;
    @Input() caption?: PortableText;
}

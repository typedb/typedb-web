import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, HostBinding, Input, NgZone, OnInit, ViewChild } from "@angular/core";

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
// import { GraphVisualisationComponent } from "../graph-visualisation/graph-visualisation.component";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-illustration",
    templateUrl: "illustration.component.html",
    styleUrls: ["illustration.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CodeSnippetComponent, PolyglotSnippetComponent, /*GraphVisualisationComponent,*/
        forwardRef(() => SplitPaneIllustrationComponent)
    ]
})
export class IllustrationComponent {
    @Input() illustration!: Illustration;
    // TODO: requiring the caller to set visible explicitly is counter-intuitive
    @Input() visible = false;
    @Input() @HostBinding("class.il-blur") isBlurred = false;

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
    selector: "td-split-pane-illustration",
    templateUrl: "split-pane-illustration.component.html",
    styleUrls: ["split-pane-illustration.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IllustrationComponent, AsyncPipe]
})
export class SplitPaneIllustrationComponent implements OnInit {
    @Input() panes!: SplitPaneIllustration;
    @Input() visible = false;
    @ViewChild("sliderEl") sliderEl!: ElementRef<HTMLElement>;

    readonly resizablePaneID: string;
    readonly sliderImageSrc$: Observable<string>;

    constructor(
        private ngZone: NgZone,
        mediaQuery: MediaQueryService,
    ) {
        this.resizablePaneID = `resizable_${Math.floor(Math.random() * 1e9)}`;
        this.sliderImageSrc$ = mediaQuery.isMobile$.pipe(
            map((isMobile) => `/assets/graphic/${isMobile ? "split-pane-slider-mobile.svg" : "split-pane-slider.svg"}`),
        );
    }

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            interact(`#${this.resizablePaneID}`)
                .resizable({
                    edges: { right: true },
                    listeners: {
                        move: (event: Interact.InteractEvent) => {
                            const scale =
                                event.target.getBoundingClientRect().width / (event.target as HTMLElement).offsetWidth;
                            let width = event.rect.width / scale;
                            if (width < 50) width = 50;
                            if (width > 600) width = 600;
                            event.target.style.width = `${width}px`;
                            this.sliderEl.nativeElement.style.left = `${width - 28}px`;
                        },
                    },
                })
                .on("resizestart", (event: Interact.InteractEvent) => {
                    event.target.style.userSelect = "none";
                })
                .on("resizeend", (event: Interact.InteractEvent) => {
                    event.target.style.userSelect = "text";
                });
        });
    }
}

@Component({
    selector: "td-captioned-illustration",
    templateUrl: "captioned-illustration.component.html",
    styleUrls: ["captioned-illustration.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AspectRatioComponent, IllustrationComponent, RichTextComponent]
})
export class CaptionedIllustrationComponent {
    @Input() illustration!: Illustration;
    @Input() caption?: PortableText;
}

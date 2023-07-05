import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from "@angular/core";
import interact from "interactjs";
import { CodeSnippet, GraphVisualisation, Illustration, ImageIllustration, PolyglotSnippet, RichText, SplitPaneIllustration, VideoEmbed } from "typedb-web-schema";
import { MediaQueryService } from "../../service/media-query.service";

@Component({
    selector: "td-illustration",
    templateUrl: "illustration.component.html",
    styleUrls: ["illustration.component.scss"],
})
export class IllustrationComponent {
    @Input() illustration!: Illustration;
    // TODO: requiring the caller to set visible explicitly is counter-intuitive
    @Input() visible = false;

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
})
export class SplitPaneIllustrationComponent implements OnInit {
    @Input() panes!: SplitPaneIllustration;
    @Input() visible = false;
    @ViewChild("sliderEl") sliderEl!: ElementRef<HTMLElement>;
    resizablePaneID = "";
    isMobile = false;

    constructor(private _ngZone: NgZone, private _mediaQuery: MediaQueryService) {}

    ngOnInit() {
        this._mediaQuery.isMobile.subscribe((isMobile) => {
            this.resizablePaneID = `resizable_${Math.floor(Math.random() * 1e9)}`;
            this.isMobile = isMobile;
            this._ngZone.runOutsideAngular(() => {
                interact(`#${this.resizablePaneID}`)
                    .resizable({
                        edges: { right: true },
                        listeners: {
                            move: (event: any) => {
                                const scale = event.target.getBoundingClientRect().width / event.target.offsetWidth;
                                let width = event.rect.width / scale;
                                if (width < 50) width = 50;
                                if (width > 600) width = 600;
                                event.target.style.width = `${width}px`;
                                this.sliderEl.nativeElement.style.left = `${width - 28}px`;
                            }
                        }
                    })
                    .on("resizestart", (event: any) => {
                        event.target!.style["user-select"] = "none";
                    })
                    .on("resizeend", (event: any) => {
                        event.target.style["user-select"] = "text";
                    });
            });
        });
    }

    get sliderImageSrc(): string {
        return `/assets/graphic/${this.isMobile ? "split-pane-slider-mobile.svg" : "split-pane-slider.svg"}`;
    }
}

@Component({
    selector: "td-captioned-illustration",
    templateUrl: "captioned-illustration.component.html",
    styleUrls: ["captioned-illustration.component.scss"],
})
export class CaptionedIllustrationComponent {
    @Input() illustration!: Illustration;
    @Input() caption!: RichText;
}


import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

import { Organisation, TechnicolorBlock } from "typedb-web-schema";

import { ActionsComponent } from "../actions/actions.component";
import { LinkDirective } from "../link/link.directive";
import { OrganisationLogosComponent } from "../organisation-logos/organisation-logos.component";
import { RichTextComponent } from "../text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../text/text-with-highlights.component";

@Component({
    selector: "td-technicolor-block",
    templateUrl: "technicolor-block.component.html",
    styleUrls: ["./technicolor-block.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        HeadingWithHighlightsComponent, RichTextComponent, ActionsComponent, OrganisationLogosComponent
    ]
})
export class TechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;
    @Input() level: "h1" | "h2" = "h2";
    @Input() @HostBinding("class.tb-no-upper") noUpperLine?: boolean;
    @Input() noBody?: boolean;
    @Input() @HostBinding("class.tb-long-upper") longUpperLine?: boolean;
    @Input() organisationLogos?: Organisation[];

    // private readonly opacityChangeDistance = 15;

    // constructor(
    //     private destroyRef: DestroyRef,
    //     private elementRef: ElementRef<HTMLElement>,
    //     private ngZone: NgZone,
    // ) {}

    // ngAfterViewInit(): void {
    //     this.ngZone.runOutsideAngular(() => {
    //         const { cleanupDotListeners } = this.initDotListeners();
    //         this.destroyRef.onDestroy(() => {
    //             cleanupDotListeners();
    //         });
    //     });
    // }

    @HostBinding("class")
    get clazz(): string {
        return `section ${this.levelClass} ${this.colorClass}`;
    }

    private get colorClass(): string {
        switch (this.index % 3) {
            case 0:
                return "tb-green";
            case 1:
                return "tb-pink";
            case 2:
                return "tb-yellow";
            default:
                throw "Unreachable code";
        }
    }

    private get levelClass(): string {
        return `tb-level-${this.level}`;
    }

    get themeColorHex(): string {
        switch (this.index % 3) {
            case 0:
                return "#02DAC9"; // TODO: parametrise
            case 1:
                return "#FF87DC";
            case 2:
                return "#FFE49E";
            default:
                throw "Unreachable code";
        }
    }

    // private initDotListeners() {
    //     const dotEls = this.elementRef.nativeElement.querySelectorAll<HTMLElement>(".tb-graphic-dot");
    //     const handleScroll = () => dotEls.forEach((dotEl) => this.updateDotPosition(dotEl));
    //     window.addEventListener("scroll", handleScroll);
    //     window.addEventListener("resize", handleScroll);
    //     handleScroll();
    //     const cleanupDotListeners = () => {
    //         window.removeEventListener("scroll", handleScroll);
    //         window.removeEventListener("resize", handleScroll);
    //     };
    //     return { cleanupDotListeners };
    // }

    // private updateDotPosition(dotEl: HTMLElement): void {
    //     if (dotEl.parentElement) {
    //         const { height: parentHeight, top: parentOffset } = dotEl.parentElement.getBoundingClientRect();
    //         const initialOffset = dotEl.offsetTop;
    //         const keyframes = this.calculateDotAnimationKeyframes({ initialOffset, parentHeight, parentOffset });
    //         const { top: finalOffset, opacity: finalOpacity } = keyframes[keyframes.length - 1];

    //         dotEl.animate(keyframes, { duration: 300, easing: "ease" });
    //         dotEl.style.top = `${finalOffset}`;
    //         dotEl.style.opacity = `${finalOpacity}`;
    //     }
    // }

    // private calculateDotAnimationKeyframes({
    //     initialOffset,
    //     parentHeight,
    //     parentOffset,
    // }: {
    //     initialOffset: number;
    //     parentHeight: number;
    //     parentOffset: number;
    // }): Keyframe[] {
    //     const finalOffset = window.innerHeight / 2 - parentOffset;
    //     const opacity = 1 + (parentHeight / 2 - Math.abs(parentHeight / 2 - finalOffset)) / this.opacityChangeDistance;
    //     const finalOpacity = Math.max(Math.min(opacity, 1), 0);

    //     const topHiddenOffset = (-this.opacityChangeDistance - initialOffset) / (finalOffset - initialOffset);
    //     const topVisibleOffset = (0 - initialOffset) / (finalOffset - initialOffset);
    //     const bottomVisibleOffset = (parentHeight - initialOffset) / (finalOffset - initialOffset);
    //     const bottomHiddenOffset =
    //         (parentHeight + this.opacityChangeDistance - initialOffset) / (finalOffset - initialOffset);

    //     const calculatedKeyframes: (Keyframe & { offset: number })[] = [
    //         { opacity: 0, top: `${-this.opacityChangeDistance}px`, offset: topHiddenOffset },
    //         { opacity: 1, top: `0px`, offset: topVisibleOffset },
    //         { opacity: 1, top: `${parentHeight}px`, offset: bottomVisibleOffset },
    //         { opacity: 0, top: `${parentHeight + this.opacityChangeDistance}px`, offset: bottomHiddenOffset },
    //     ].filter(({ offset }) => offset > 0 && offset < 1);

    //     const allKeyframes = calculatedKeyframes.concat(
    //         { top: `${initialOffset}px`, offset: 0 },
    //         { top: `${finalOffset}px`, opacity: finalOpacity, offset: 1 },
    //     );

    //     return allKeyframes.sort((a, b) => a.offset - b.offset);
    // }
}

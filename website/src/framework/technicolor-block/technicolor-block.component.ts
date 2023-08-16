import { AfterViewInit, Component, DestroyRef, ElementRef, Input } from "@angular/core";
import { TechnicolorBlock } from "typedb-web-schema";

@Component({
    selector: "td-technicolor-block",
    templateUrl: "technicolor-block.component.html",
    styleUrls: ["./technicolor-block.component.scss"],
})
export class TechnicolorBlockComponent implements AfterViewInit {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;
    @Input() size: "medium" | "large" = "medium";
    @Input() contentWidth: "narrow" | "wide" = "wide";
    @Input() noLeadingLine?: boolean;
    @Input() noTrailingLine?: boolean;
    @Input() noBody?: boolean;
    @Input() longUpperChain?: boolean;

    private readonly opacityChangeDistance = 15;

    constructor(
        private destroyRef: DestroyRef,
        private elementRef: ElementRef<HTMLElement>,
    ) {}

    ngAfterViewInit(): void {
        const { cleanupDotListeners } = this.initDotListeners();
        this.destroyRef.onDestroy(() => {
            cleanupDotListeners();
        });
    }

    get graphicColorClass(): string {
        switch (this.index % 3) {
            case 0:
                return "tb-graphic-green";
            case 1:
                return "tb-graphic-pink";
            case 2:
                return "tb-graphic-yellow";
            default:
                throw "Unreachable code";
        }
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

    get titleClass(): string {
        switch (this.size) {
            case "large":
                return "text-56-64 text-48-60-tablet text-34-48-mobile";
            case "medium":
                return "text-40-54 text-34-48-tablet text-22-33-mobile";
        }
    }

    get bodyClass(): string {
        switch (this.size) {
            case "large":
                return "tb-text-l text-32-44 text-24-37-tablet text-16-24-mobile";
            case "medium":
                return "tb-text-m text-24-32 text-20-32-tablet text-14-21-mobile";
        }
    }

    private initDotListeners() {
        const dotEls = this.elementRef.nativeElement.querySelectorAll<HTMLElement>(".tb-graphic-dot");
        const handleScroll = () => dotEls.forEach((dotEl) => this.updateDotPosition(dotEl));
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();
        const cleanupDotListeners = () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
        return { cleanupDotListeners };
    }

    private updateDotPosition(dotEl: HTMLElement): void {
        if (dotEl.parentElement) {
            const { height: parentHeight, top: parentOffset } = dotEl.parentElement.getBoundingClientRect();
            const initialOffset = dotEl.offsetTop;
            const keyframes = this.calculateDotAnimationKeyframes({ initialOffset, parentHeight, parentOffset });
            const { top: finalOffset, opacity: finalOpacity } = keyframes[keyframes.length - 1];

            dotEl.animate(keyframes, { duration: 300, easing: "ease" });
            dotEl.style.top = `${finalOffset}`;
            dotEl.style.opacity = `${finalOpacity}`;
        }
    }

    private calculateDotAnimationKeyframes({
        initialOffset,
        parentHeight,
        parentOffset,
    }: {
        initialOffset: number;
        parentHeight: number;
        parentOffset: number;
    }): Keyframe[] {
        const finalOffset = window.innerHeight / 2 - parentOffset;
        const opacity = 1 + (parentHeight / 2 - Math.abs(parentHeight / 2 - finalOffset)) / this.opacityChangeDistance;
        const finalOpacity = Math.max(Math.min(opacity, 1), 0);

        const topHiddenOffset = (-this.opacityChangeDistance - initialOffset) / (finalOffset - initialOffset);
        const topVisibleOffset = (0 - initialOffset) / (finalOffset - initialOffset);
        const bottomVisibleOffset = (parentHeight - initialOffset) / (finalOffset - initialOffset);
        const bottomHiddenOffset =
            (parentHeight + this.opacityChangeDistance - initialOffset) / (finalOffset - initialOffset);

        const calculatedKeyframes: (Keyframe & { offset: number })[] = [
            { opacity: 0, top: `${-this.opacityChangeDistance}px`, offset: topHiddenOffset },
            { opacity: 1, top: `0px`, offset: topVisibleOffset },
            { opacity: 1, top: `${parentHeight}px`, offset: bottomVisibleOffset },
            { opacity: 0, top: `${parentHeight + this.opacityChangeDistance}px`, offset: bottomHiddenOffset },
        ].filter(({ offset }) => offset > 0 && offset < 1);

        const allKeyframes = calculatedKeyframes.concat(
            { top: `${initialOffset}px`, offset: 0 },
            { top: `${finalOffset}px`, opacity: finalOpacity, offset: 1 },
        );

        return allKeyframes.sort((a, b) => a.offset - b.offset);
    }
}

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

    constructor(
        private destroyRef: DestroyRef,
        private elementRef: ElementRef<HTMLElement>,
    ) {}

    ngAfterViewInit(): void {
        const dotEls = this.elementRef.nativeElement.querySelectorAll<HTMLElement>(".tb-graphic-dot");
        const handleScroll = () =>
            dotEls.forEach((dotEl) => {
                if (dotEl.parentElement) {
                    const opacityChangeDistance = 30;
                    const parentRect = dotEl.parentElement.getBoundingClientRect();
                    const offsetTop = window.innerHeight / 2 - parentRect.top;
                    const opacity = Math.max(
                        Math.min(
                            (parentRect.height / 2 +
                                opacityChangeDistance -
                                Math.abs(parentRect.height / 2 - offsetTop)) /
                                opacityChangeDistance,
                            1,
                        ),
                        0,
                    );
                    const keyframes: (Keyframe & { offset: number })[] = [
                        { top: `${dotEl.offsetTop}px`, offset: 0 },
                        { top: `${offsetTop}px`, opacity, offset: 1 },
                    ];
                    const topHiddenOffset = (-opacityChangeDistance - dotEl.offsetTop) / (offsetTop - dotEl.offsetTop);
                    const topVisibleOffset = (0 - dotEl.offsetTop) / (offsetTop - dotEl.offsetTop);
                    const bottomVisibleOffset = (parentRect.height - dotEl.offsetTop) / (offsetTop - dotEl.offsetTop);
                    const bottomHiddenOffset =
                        (parentRect.height + opacityChangeDistance - dotEl.offsetTop) / (offsetTop - dotEl.offsetTop);
                    if (topHiddenOffset < 1 && topHiddenOffset > 0) {
                        keyframes.push({
                            opacity: 0,
                            top: `${-opacityChangeDistance}px`,
                            offset: topHiddenOffset,
                        });
                    }
                    if (topVisibleOffset < 1 && topVisibleOffset > 0) {
                        keyframes.push({
                            opacity: 1,
                            top: `0px`,
                            offset: topVisibleOffset,
                        });
                    }
                    if (bottomVisibleOffset < 1 && bottomVisibleOffset > 0) {
                        keyframes.push({
                            opacity: 1,
                            top: `${parentRect.height}px`,
                            offset: bottomVisibleOffset,
                        });
                    }
                    if (bottomHiddenOffset < 1 && bottomHiddenOffset > 0) {
                        keyframes.push({
                            opacity: 0,
                            top: `${parentRect.height + opacityChangeDistance}px`,
                            offset: bottomHiddenOffset,
                        });
                    }
                    keyframes.sort((a, b) => a.offset - b.offset);
                    dotEl.animate(keyframes, { duration: 300, easing: "ease" });
                    dotEl.style.top = `${offsetTop}px`;
                    dotEl.style.opacity = `${opacity}`;
                }
            });
        this.destroyRef.onDestroy(() => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        });
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();
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
}

import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    ViewChild,
} from "@angular/core";

@Component({
    selector: "[tdPageBackground]",
    templateUrl: "page-background.component.html",
    styleUrls: ["page-background.component.scss"],
})
export class PageBackgroundComponent implements OnDestroy, AfterViewInit {
    @Input("nebula") nebula?: string;
    @Input("planet") planet?: string;

    @ViewChild("nebulaRef") nebulaRef!: ElementRef<HTMLDivElement>;
    @ViewChild("planetRef") planetRef!: ElementRef<HTMLDivElement>;

    private removeListener = () => {};

    private readonly topOffset = 300;
    private readonly bottomOffset = 300;
    private readonly spaceSpeed = 0.2;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private ngZone: NgZone
    ) {}

    ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            const handleScroll = () => {
                const topScrolled = Math.min(this.topOffset, window.scrollY);
                const bottomScrolled = Math.max(
                    0,
                    this.bottomOffset +
                        window.innerHeight +
                        window.scrollY -
                        this.elementRef.nativeElement.clientHeight
                );
                const distance =
                    this.spaceSpeed * window.scrollY +
                    (1 - this.spaceSpeed) * (topScrolled + bottomScrolled);

                this.elementRef.nativeElement.style.backgroundPositionY = `${-distance}px`;
            };

            this.removeListener = () =>
                window.removeEventListener("scroll", handleScroll);

            window.addEventListener("scroll", handleScroll, { passive: true });

            handleScroll();
        });
    }

    ngOnDestroy(): void {
        this.removeListener();
    }

    getNebulaSrc(
        size: "desktop" | "tablet" | "mobile",
        density2x?: boolean
    ): string {
        const densityPart = density2x ? `-2x` : "";
        return `/assets/background/${size}/nebula-${this.nebula}${densityPart}.webp`;
    }

    getPlanetSrc(
        size: "desktop" | "tablet" | "mobile",
        density2x?: boolean
    ): string {
        const densityPart = density2x ? `-2x` : "";
        return `/assets/background/${size}/planet-${this.planet}${densityPart}.webp`;
    }
}

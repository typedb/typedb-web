import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Directive, ElementRef, HostBinding, Input, NgZone, OnDestroy, OnInit } from "@angular/core";
import { Subscription, map } from "rxjs";

type BackgroundSize = "mobile" | "tablet" | "desktop";

@Directive({
    selector: "[tdPageBackground]",
})
export class PageBackgroundDirective implements OnDestroy, OnInit {
    @Input("nebula") nebula?: string;
    @Input("planet") planet?: string;
    @HostBinding("style.background-attachment") backgroundAttachement = "local, fixed, fixed";
    @HostBinding("style.background-position") backgroundPosition = "center bottom, center top, center top";
    @HostBinding("style.background-repeat") backgroundRepeat = "no-repeat, no-repeat, repeat";

    private breakpointSub = Subscription.EMPTY;
    private removeListener = () => {};

    private readonly breakpoints = {
        tablet: "(max-width:1024px)",
        mobile: "(max-width:375px)",
    };
    private readonly nebulaSpeed = 0.3;
    private readonly spaceSpeed = 0.2;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private elementRef: ElementRef<HTMLElement>,
        private ngZone: NgZone
    ) {}

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.breakpointSub = this.breakpointObserver
                .observe(Object.values(this.breakpoints))
                .pipe(map((value) => this.getActiveScreen(value)))
                .subscribe((size) => {
                    this.elementRef.nativeElement.style.backgroundImage = this.getBackgroundImage(size);
                    this.elementRef.nativeElement.style.backgroundSize = this.getBackgroundSize(size);
                });

            const handleScroll = () => {
                this.elementRef.nativeElement.style.backgroundPositionY = `bottom, ${
                    -window.scrollY * this.nebulaSpeed + 30
                }px, ${-window.scrollY * this.spaceSpeed}px`;
            };

            this.removeListener = () => window.removeEventListener("scroll", handleScroll);

            window.addEventListener("scroll", handleScroll, { passive: true });

            handleScroll();
        });
    }

    ngOnDestroy(): void {
        this.breakpointSub.unsubscribe();
        this.removeListener();
    }

    private getActiveScreen(state: BreakpointState): BackgroundSize {
        switch (true) {
            case state.breakpoints[this.breakpoints.mobile]:
                return "mobile";
            case state.breakpoints[this.breakpoints.tablet]:
                return "tablet";
            default:
                return "desktop";
        }
    }

    private getBackgroundImage(size: BackgroundSize): string {
        const nebulaUrl = this.nebula ? `url("/assets/background/nebula-${this.nebula}.png")` : "none";
        const planetUrl = this.planet ? `url("/assets/background/${size}/planet-${this.planet}.png")` : "none";
        const spaceUrl = `url("/assets/background/deep-space.png")`;
        return `${planetUrl}, ${nebulaUrl}, ${spaceUrl}`;
    }

    private getBackgroundSize(size: BackgroundSize): string {
        const contentWidth = { desktop: 1920, tablet: 1024, mobile: 375 }[size];
        return `${contentWidth}px, ${contentWidth}px, cover`;
    }
}

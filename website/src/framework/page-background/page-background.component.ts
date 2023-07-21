import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    ViewChild,
} from "@angular/core";
import { Subscription, map } from "rxjs";

type BackgroundSize = "mobile" | "tablet" | "desktop";

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

    private breakpointSub = Subscription.EMPTY;
    private removeListener = () => {};

    private readonly breakpoints = {
        tablet: "(max-width:1024px)",
        mobile: "(max-width:375px)",
    };
    private readonly offsetStart = 300;
    private readonly spaceSpeed = 0.2;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private elementRef: ElementRef<HTMLElement>,
        private ngZone: NgZone,
    ) {}

    ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.breakpointSub = this.breakpointObserver
                .observe(Object.values(this.breakpoints))
                .pipe(map((value) => this.getActiveScreen(value)))
                .subscribe((size) => {
                    this.elementRef.nativeElement.style.backgroundImage = `url("/assets/background/deep-space.png")`;
                    this.planetRef.nativeElement.style.backgroundImage = `url("/assets/background/desktop/planet-${this.planet}.png")`;
                });

            const handleScroll = () => {
                const distance =
                    window.scrollY * this.spaceSpeed +
                    (1 - this.spaceSpeed) *
                        Math.min(this.offsetStart, window.scrollY);

                this.elementRef.nativeElement.style.backgroundPositionY = `${-distance}px`;
            };

            this.removeListener = () =>
                window.removeEventListener("scroll", handleScroll);

            window.addEventListener("scroll", handleScroll, { passive: true });

            handleScroll();
        });
    }

    ngOnDestroy(): void {
        this.breakpointSub.unsubscribe();
        this.removeListener();
    }

    getNebulaImage(): string {
        return `url("/assets/background/nebula-${this.nebula}.png")`;
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
}

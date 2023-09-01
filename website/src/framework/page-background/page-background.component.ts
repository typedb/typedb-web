import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy } from "@angular/core";
import { Subject, distinctUntilChanged, takeUntil } from "rxjs";
import { MediaQueryService } from "src/service/media-query.service";
import { SanitySiteBanner, siteBannerSchemaName } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "[tdPageBackground]",
    templateUrl: "page-background.component.html",
    styleUrls: ["page-background.component.scss"],
})
export class PageBackgroundComponent implements OnDestroy, AfterViewInit {
    @Input("nebula") nebula?: "cloud" | "deploy" | "features" | "home" | "intro" | "solutions" | "studio";
    @Input("planet") planet?: "blue_pink" | "green" | "pink_green" | "pink" | "yellow_green";

    private readonly destroyNotifier = new Subject<void>();

    private readonly topOffset = 300;
    private readonly bottomOffset = 300;
    private readonly spaceSpeed = 0.2;
    private withSiteBanner = false;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private mediaQuery: MediaQueryService,
        private ngZone: NgZone,
        private contentService: ContentService,
    ) {
        this.contentService.data.subscribe((data) => {
            const sanitySiteBanner = data.getDocumentByID(siteBannerSchemaName) as SanitySiteBanner;
            this.withSiteBanner = !!sanitySiteBanner?.isEnabled;
        });
    }

    ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            const handleScroll = () => {
                const htmlEl = window.document.documentElement;
                if (htmlEl.scrollHeight === htmlEl.clientHeight) {
                    return;
                }

                const topScrolled = Math.min(
                    this.topOffset,
                    window.scrollY,
                    this.elementRef.nativeElement.clientHeight - window.innerHeight - this.bottomOffset,
                );
                const bottomScrolled = Math.max(
                    0,
                    this.bottomOffset +
                        window.innerHeight +
                        window.scrollY -
                        this.elementRef.nativeElement.clientHeight,
                );
                const distance =
                    this.spaceSpeed * window.scrollY + (1 - this.spaceSpeed) * (topScrolled + bottomScrolled);

                this.elementRef.nativeElement.style.backgroundPositionY = `${-distance}px`;
            };

            const addListeners = () => {
                window.addEventListener("scroll", handleScroll, { passive: true });
                window.addEventListener("resize", handleScroll, { passive: true });
                handleScroll();
            };
            const removeListeners = () => {
                window.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", handleScroll);
            };

            this.mediaQuery.isMobile.pipe(takeUntil(this.destroyNotifier), distinctUntilChanged()).subscribe({
                next: (isMobile) => (isMobile ? removeListeners() : addListeners()),
                complete: removeListeners,
            });
        });
    }

    ngOnDestroy(): void {
        this.destroyNotifier.next();
        this.destroyNotifier.complete();
    }

    getNebulaClass(): string {
        return `pb-nebula-${this.nebula}${this.withSiteBanner ? ' pb-nebula-with-site-banner' : ''}`;
    }

    getNebulaSrc(size: "desktop" | "tablet" | "mobile", density2x?: boolean): string {
        const densityPart = density2x ? `-2x` : "";
        return `/assets/background/${size}/nebula-${this.nebula}${densityPart}.webp`;
    }

    getPlanetSrc(size: "desktop" | "tablet" | "mobile", density2x?: boolean): string {
        const densityPart = density2x ? `-2x` : "";
        return `/assets/background/${size}/planet-${this.planet}${densityPart}.webp`;
    }
}

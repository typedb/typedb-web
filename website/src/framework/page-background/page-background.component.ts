import { Component, Input } from "@angular/core";

import { map, Observable } from "rxjs";
import { SanitySiteBanner, siteBannerSchemaName } from "typedb-web-schema";

import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-page-background, [tdPageBackground]",
    templateUrl: "page-background.component.html",
    styleUrls: ["page-background.component.scss"],
})
export class PageBackgroundComponent {
    @Input() nebula?: "cloud" | "deploy" | "features" | "home" | "intro" | "solutions" | "studio";
    @Input() planet?: "blue_pink" | "green" | "pink_green" | "pink" | "yellow_green";

    // private readonly isMobile$: Observable<boolean>;
    readonly hasBanner$: Observable<boolean>;

    // private readonly topOffset = 300;
    // private readonly bottomOffset = 300;
    // private readonly spaceSpeed = 0.2;

    constructor(
        // private elementRef: ElementRef<HTMLElement>,
        // private ngZone: NgZone,
        // mediaQuery: MediaQueryService,
        private contentService: ContentService,
    ) {
        // this.isMobile$ = mediaQuery.isMobile.pipe(takeUntilDestroyed(), distinctUntilChanged());
        this.hasBanner$ = this.contentService.data.pipe(
            map((data) => {
                const sanitySiteBanner = data.getDocumentByID(siteBannerSchemaName) as SanitySiteBanner;
                return !!sanitySiteBanner?.isEnabled;
            }),
        );
    }

    // ngAfterViewInit(): void {
    //     this.ngZone.runOutsideAngular(() => {
    //         const handleScroll = () => {
    //             const htmlEl = window.document.documentElement;
    //             if (htmlEl.scrollHeight === htmlEl.clientHeight) {
    //                 return;
    //             }

    //             const topScrolled = Math.min(
    //                 this.topOffset,
    //                 window.scrollY,
    //                 this.elementRef.nativeElement.clientHeight - window.innerHeight - this.bottomOffset,
    //             );
    //             const bottomScrolled = Math.max(
    //                 0,
    //                 this.bottomOffset +
    //                     window.innerHeight +
    //                     window.scrollY -
    //                     this.elementRef.nativeElement.clientHeight,
    //             );
    //             const distance =
    //                 this.spaceSpeed * window.scrollY + (1 - this.spaceSpeed) * (topScrolled + bottomScrolled);

    //             this.elementRef.nativeElement.style.backgroundPositionY = `${-distance}px`;
    //         };

    //         const addListeners = () => {
    //             window.addEventListener("scroll", handleScroll, { passive: true });
    //             window.addEventListener("resize", handleScroll, { passive: true });
    //             handleScroll();
    //         };
    //         const removeListeners = () => {
    //             window.removeEventListener("scroll", handleScroll);
    //             window.removeEventListener("resize", handleScroll);
    //         };

    //         this.isMobile$.subscribe({
    //             next: (isMobile) => (isMobile ? removeListeners() : addListeners()),
    //             complete: removeListeners,
    //         });
    //     });
    // }

    getNebulaClass(): string {
        return `pb-nebula-${this.nebula}`;
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

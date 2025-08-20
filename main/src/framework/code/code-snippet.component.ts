import { AsyncPipe, isPlatformBrowser } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, PLATFORM_ID, ViewChild, inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { initCustomScrollbars } from "typedb-web-common/lib";
import { CodeSnippet } from "typedb-web-schema";
import { MediaQueryService } from "../../service/media-query.service";

const DEFAULT_MIN_LINES = { desktop: 1, mobile: 13 };

@Component({
    selector: "td-code-snippet",
    templateUrl: "code-snippet.component.html",
    styleUrls: ["code-snippet.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe]
})
export class CodeSnippetComponent implements AfterViewInit {
    private readonly platformId = inject(PLATFORM_ID);
    @Input() snippet!: CodeSnippet;
    @ViewChild("scrollbarX") scrollbarX!: ElementRef<HTMLElement>;
    @ViewChild("scrollbarY") scrollbarY!: ElementRef<HTMLElement>;

    lineNumbers$: Observable<number[]>;

    constructor(
        private elementRef: ElementRef<HTMLElement>, private mediaQuery: MediaQueryService, private ngZone: NgZone,
    ) {
        this.lineNumbers$ = this.mediaQuery.isMobile$.pipe(
            map((isMobile) => {
                const lines = Math.max(
                    (this.snippet.code.match(/\n/g) || []).length + 2,
                    DEFAULT_MIN_LINES[isMobile ? "mobile" : "desktop"],
                );
                return [...Array(lines).keys()].map((n) => n + 1);
            }),
        );
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                (window as any)["Prism"].highlightAllUnder(this.elementRef.nativeElement);
            });

            // this.ngZone.runOutsideAngular(() => initCustomScrollbars(this.elementRef.nativeElement));
        }
    }

    ngAfterViewChecked() {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                (window as any)["Prism"].highlightAllUnder(this.elementRef.nativeElement);
            });

            // this.ngZone.runOutsideAngular(() => initCustomScrollbars(this.elementRef.nativeElement));
        }
    }
}

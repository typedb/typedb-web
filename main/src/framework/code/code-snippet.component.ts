import { AsyncPipe, isPlatformBrowser } from "@angular/common";
import { AfterViewInit, AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnChanges, PLATFORM_ID, SimpleChanges, ViewChild, inject, signal, ViewEncapsulation } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { CodeSnippet } from "typedb-web-schema";
import { MediaQueryService } from "../../service/media-query.service";
import { SyntaxHighlightDirective } from "./syntax-highlight.directive";

const DEFAULT_MIN_LINES = { desktop: 1, mobile: 13 };

@Component({
    selector: "td-code-snippet",
    templateUrl: "code-snippet.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [AsyncPipe, SyntaxHighlightDirective]
})
export class CodeSnippetComponent implements OnChanges {
    private readonly platformId = inject(PLATFORM_ID);
    @Input({ required: true }) language!: string;
    @Input({ required: true }) code!: string;
    @ViewChild("scrollbarX") scrollbarX!: ElementRef<HTMLElement>;
    @ViewChild("scrollbarY") scrollbarY!: ElementRef<HTMLElement>;
    copied = signal(false);

    lineNumbers$: Observable<number[]> = of([]);

    constructor(
        private elementRef: ElementRef<HTMLElement>, private mediaQuery: MediaQueryService, private ngZone: NgZone,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.lineNumbers$ = this.mediaQuery.isMobile$.pipe(
            map((isMobile) => {
                const lines = Math.max(
                    (this.code.match(/\n/g) || []).length + 2,
                    DEFAULT_MIN_LINES[isMobile ? "mobile" : "desktop"],
                );
                return [...Array(lines).keys()].map((n) => n + 1);
            }),
        );
    }

    async copyCode() {
        await navigator.clipboard.writeText(this.code);
        this.copied.set(true);
        
        // Reset copied state after 3 seconds
        setTimeout(() => {
            this.copied.set(false);
        }, 3000);
    }
}

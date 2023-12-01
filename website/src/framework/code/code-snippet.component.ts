import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    Input,
    NgZone,
    OnInit,
    ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import Prism from "prismjs";
import { defer, filter, map, merge, Observable, shareReplay, startWith, Subject } from "rxjs";
import { CodeSnippet, languages, PolyglotSnippet } from "typedb-web-schema";

import { MediaQueryService } from "src/service/media-query.service";

import { sanitiseHtmlID } from "../util";

const DEFAULT_MIN_LINES = { desktop: 33, mobile: 13 };

@Component({
    selector: "td-code-snippet",
    templateUrl: "code-snippet.component.html",
    styleUrls: ["code-snippet.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeSnippetComponent implements AfterViewInit {
    @Input() snippet!: CodeSnippet;
    @ViewChild("scrollbarX") scrollbarX!: ElementRef<HTMLElement>;
    @ViewChild("scrollbarY") scrollbarY!: ElementRef<HTMLElement>;

    lineNumbers$: Observable<number[]>;

    constructor(
        private destroyRef: DestroyRef,
        private elementRef: ElementRef<HTMLElement>,
        private mediaQuery: MediaQueryService,
        private ngZone: NgZone,
    ) {
        this.lineNumbers$ = this.mediaQuery.isMobile.pipe(
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
        Prism.highlightAll();

        const { onDestroy } = this.ngZone.runOutsideAngular(() => this.initCustomScrollbars());
        this.destroyRef.onDestroy(onDestroy);
    }

    private initCustomScrollbars() {
        const handleScroll = () => {
            this.updateScrollbarThumb(this.scrollbarX.nativeElement, "x");
            this.updateScrollbarThumb(this.scrollbarY.nativeElement, "y");
        };
        this.elementRef.nativeElement.addEventListener("scroll", handleScroll);
        const observer = new ResizeObserver(handleScroll);
        observer.observe(this.elementRef.nativeElement);
        handleScroll();

        this.initScrollbarThumbListeners(this.scrollbarX.nativeElement, "x");
        this.initScrollbarThumbListeners(this.scrollbarY.nativeElement, "y");

        return {
            onDestroy: () => observer.disconnect(),
        };
    }

    private initScrollbarThumbListeners(scrollbar: HTMLElement, orientation: "x" | "y"): void {
        const scrollbarThumb = scrollbar.firstElementChild as HTMLElement;

        scrollbarThumb.addEventListener("mousedown", (ev) =>
            this.onScrollbarThumbMouseDown(ev, scrollbar, orientation),
        );
        scrollbar.addEventListener("mousedown", (ev) => this.onScrollbarMouseDown(ev, scrollbar, orientation));
    }

    private onScrollbarMouseDown(ev: MouseEvent, scrollbar: HTMLElement, orientation: "x" | "y"): void {
        ev.preventDefault();

        const [clientSize, scrollSize, scrollOffset, offsetAxis] =
            orientation === "x"
                ? (["clientWidth", "scrollWidth", "scrollLeft", "offsetX"] as const)
                : (["clientHeight", "scrollHeight", "scrollTop", "offsetY"] as const);
        const scrollbarThumb = scrollbar.firstElementChild as HTMLElement;
        const scrollContainer = this.elementRef.nativeElement;

        const scrollPosition =
            (ev[offsetAxis] - scrollbarThumb[clientSize] / 2) / (scrollbar[clientSize] - scrollbarThumb[clientSize]);
        scrollContainer[scrollOffset] = scrollPosition * (scrollContainer[scrollSize] - scrollContainer[clientSize]);
    }

    private onScrollbarThumbMouseDown(ev: MouseEvent, scrollbar: HTMLElement, orientation: "x" | "y"): void {
        ev.preventDefault();
        ev.stopPropagation();

        const [clientSize, scrollSize, scrollOffset, clientOffset, offset] =
            orientation === "x"
                ? (["clientWidth", "scrollWidth", "scrollLeft", "clientX", "offsetLeft"] as const)
                : (["clientHeight", "scrollHeight", "scrollTop", "clientY", "offsetTop"] as const);
        const scrollbarThumb = scrollbar.firstElementChild as HTMLElement;
        const scrollContainer = this.elementRef.nativeElement;
        const startOffset = ev[clientOffset];
        const startThumbOffset = scrollbarThumb[offset];
        scrollbarThumb.classList.add("td-active");
        const onMouseMove = (ev2: MouseEvent) => {
            const scrollPosition =
                (startThumbOffset + ev2[clientOffset] - startOffset) /
                (scrollbar[clientSize] - scrollbarThumb[clientSize]);
            scrollContainer[scrollOffset] =
                scrollPosition * (scrollContainer[scrollSize] - scrollContainer[clientSize]);
        };
        const onMouseUp = () => {
            scrollbarThumb.classList.remove("td-active");
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseup", onMouseUp);
    }

    private updateScrollbarThumb(scrollbar: HTMLElement, orientation: "x" | "y"): void {
        const [clientSize, scrollSize, scrollOffset, size, offsetSide] =
            orientation === "x"
                ? (["clientWidth", "scrollWidth", "scrollLeft", "width", "left"] as const)
                : (["clientHeight", "scrollHeight", "scrollTop", "height", "top"] as const);
        const scrollbarThumb = scrollbar.firstElementChild as HTMLElement;
        const scrollContainer = this.elementRef.nativeElement;

        const thumbSize = scrollContainer[clientSize] / scrollContainer[scrollSize];

        if (thumbSize === 1) {
            scrollbar.style.display = "none";
            return;
        }

        scrollbar.style.display = "";

        const scrollPosition =
            scrollContainer[scrollOffset] / (scrollContainer[scrollSize] - scrollContainer[clientSize]);

        const thumbOffset = scrollPosition * (scrollbar[clientSize] - scrollbarThumb[clientSize]);
        scrollbarThumb.style[size] = `${thumbSize * 100}%`;
        scrollbarThumb.style[offsetSide] = `${thumbOffset}px`;
    }
}

@Component({
    selector: "td-polyglot-snippet",
    templateUrl: "polyglot-snippet.component.html",
    styleUrls: ["polyglot-snippet.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolyglotSnippetComponent implements OnInit, AfterViewInit {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input("snippet") polyglotSnippet!: PolyglotSnippet;
    @Input() setWindowHashOnTabClick = false;

    readonly selectedSnippet$: Observable<CodeSnippet>;
    lineNumbers$: Observable<number[]>;
    private readonly tabClick$: Subject<CodeSnippet> = new Subject();
    private _elementID!: string;

    get languageDisplayNames() {
        return languages;
    }

    constructor(
        private router: Router,
        private mediaQuery: MediaQueryService,
        private _el: ElementRef,
        activatedRoute: ActivatedRoute,
    ) {
        this.lineNumbers$ = this.mediaQuery.isMobile.pipe(
            map((isMobile) => {
                const lines = Math.max(
                    ...this.polyglotSnippet.snippets.map((x) => (x.code.match(/\n/g) || []).length + 2),
                    DEFAULT_MIN_LINES[isMobile ? "mobile" : "desktop"],
                );
                return [...Array(lines).keys()].map((n) => n + 1);
            }),
        );
        this.selectedSnippet$ = defer(() =>
            merge(
                activatedRoute.fragment.pipe(
                    map((value) => this.polyglotSnippet.snippets.find((x) => this.snippetTabID(x) === value)),
                    filter((v): v is CodeSnippet => !!v),
                ),
                this.tabClick$,
            ).pipe(startWith(this.polyglotSnippet.snippets[0]), shareReplay(1)),
        );
    }

    ngOnInit() {
        if (!this._el.nativeElement.id.length) {
            throw `${this.constructor.name}'s native HTML element must have an id set`;
        }
        this._elementID = this._el.nativeElement.id;
    }

    ngAfterViewInit() {
        Prism.highlightAll();
    }

    snippetTabID(tab: CodeSnippet): string {
        return `${this._elementID}-${sanitiseHtmlID(tab.language)}`;
    }

    onSnippetTabClick(snippet: CodeSnippet, event: Event) {
        event.preventDefault();
        if (event.currentTarget instanceof HTMLElement) {
            event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
        this.tabClick$.next(snippet);

        if (this.setWindowHashOnTabClick) {
            this.router.navigate([], {
                fragment: this.snippetTabID(snippet),
                state: { preventScrollToAnchor: true },
            });
        }
    }
}

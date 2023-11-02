import {
    AfterViewInit,
    Component,
    DestroyRef,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    ViewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router, Event as RouterEvent, Scroll } from "@angular/router";

import { filter, Observable, Subscription } from "rxjs";
import { CodeSnippet, languages, PolyglotSnippet } from "typedb-web-schema";

import { MediaQueryService } from "src/service/media-query.service";

import { sanitiseHtmlID } from "../util";

const DEFAULT_MIN_LINES = { desktop: 33, mobile: 13 };

@Component({
    selector: "td-code-snippet",
    templateUrl: "code-snippet.component.html",
    styleUrls: ["code-snippet.component.scss"],
})
export class CodeSnippetComponent implements AfterViewInit, OnInit {
    @Input() snippet!: CodeSnippet;
    @ViewChild("scrollbarX") scrollbarX!: ElementRef<HTMLElement>;
    @ViewChild("scrollbarY") scrollbarY!: ElementRef<HTMLElement>;

    lines!: number;
    lineNumbers!: number[];
    private isMobile$: Observable<boolean>;

    constructor(
        private destroyRef: DestroyRef,
        private elementRef: ElementRef<HTMLElement>,
        private mediaQuery: MediaQueryService,
        private ngZone: NgZone,
    ) {
        this.isMobile$ = this.mediaQuery.isMobile.pipe(takeUntilDestroyed());
    }

    ngOnInit(): void {
        this.isMobile$.subscribe((isMobile) => {
            this.lines = Math.max(
                (this.snippet.code.match(/\n/g) || []).length + 2,
                DEFAULT_MIN_LINES[isMobile ? "mobile" : "desktop"],
            );
            this.lineNumbers = [...Array(this.lines).keys()].map((n) => n + 1);
        });
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
})
export class PolyglotSnippetComponent implements OnInit, AfterViewInit, OnDestroy {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input("snippet") polyglotSnippet!: PolyglotSnippet;
    @Input() setWindowHashOnTabClick = false;
    lines!: number;
    lineNumbers!: number[];
    private _elementID!: string;
    selectedSnippetTabID: string | undefined;

    private mediaQuerySubscription = Subscription.EMPTY;

    constructor(
        private router: Router,
        private _mediaQuery: MediaQueryService,
        private _el: ElementRef,
    ) {
        router.events.pipe(filter((e: RouterEvent): e is Scroll => e instanceof Scroll)).subscribe((_e) => {
            this.setSelectedTabFromWindowHash();
        });
    }

    ngOnInit() {
        if (!this._el.nativeElement.id.length) {
            throw `${this.constructor.name}'s native HTML element must have an id set`;
        }
        this._elementID = this._el.nativeElement.id;
        this.setSelectedTabFromWindowHash();
        if (!this.selectedSnippetTabID) {
            this.selectedSnippetTabID = this.snippetTabID(this.polyglotSnippet.snippets[0]);
        }
        this.mediaQuerySubscription = this._mediaQuery.isMobile.subscribe((isMobile) => {
            this.lines = Math.max(
                ...this.polyglotSnippet.snippets.map((x) => (x.code.match(/\n/g) || []).length + 2),
                DEFAULT_MIN_LINES[isMobile ? "mobile" : "desktop"],
            );
            this.lineNumbers = [...Array(this.lines).keys()].map((n) => n + 1);
        });
    }

    ngAfterViewInit() {
        Prism.highlightAll();
    }

    ngOnDestroy(): void {
        this.mediaQuerySubscription.unsubscribe();
    }

    get selectedSnippet(): CodeSnippet {
        const selectedSnippet = this.polyglotSnippet.snippets.find(
            (x) => this.snippetTabID(x) === this.selectedSnippetTabID,
        );
        if (selectedSnippet) return selectedSnippet;
        else throw "Unreachable code: duck";
    }

    snippetTabID(tab: CodeSnippet): string {
        return `${this._elementID}-${sanitiseHtmlID(tab.language)}`;
    }

    onSnippetTabClick(snippet: CodeSnippet, event: Event) {
        event.preventDefault();
        if (event.currentTarget instanceof HTMLElement) {
            event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
        this.setSelectedTab(snippet);
    }

    setSelectedTab(tab: CodeSnippet) {
        this.selectedSnippetTabID = this.snippetTabID(tab);
        if (this.setWindowHashOnTabClick) {
            this.router.navigate([], {
                fragment: this.snippetTabID(tab),
                state: { preventScrollToAnchor: true },
            });
        }
    }

    setSelectedTabFromWindowHash() {
        const targetedTab = this.polyglotSnippet.snippets.find(
            (x) => this.snippetTabID(x) === window.location.hash.slice(1),
        );
        if (targetedTab) this.setSelectedTab(targetedTab);
    }

    get languageDisplayNames() {
        return languages;
    }
}

import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { Router, Event as RouterEvent, Scroll } from "@angular/router";
import Prism from "prismjs";
import { filter, Subscription } from "rxjs";
import { CodeSnippet, ContentTextPanel, languages, PolyglotSnippet } from "typedb-web-schema";
import { MediaQueryService } from "../../service/media-query.service";
import { sanitiseHtmlID } from "../util";

const DEFAULT_MIN_LINES = { desktop: 33, mobile: 13 };

@Component({
    selector: "td-code-snippet",
    templateUrl: "code-snippet.component.html",
    styleUrls: ["code-snippet.component.scss"],
})
export class CodeSnippetComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() snippet!: CodeSnippet;
    lines!: number;
    lineNumbers!: number[];

    private mediaQuerySubscription = Subscription.EMPTY;

    constructor(private _mediaQuery: MediaQueryService) {}

    ngOnInit() {
        this.mediaQuerySubscription = this._mediaQuery.isMobile.subscribe((isMobile) => {
            this.lines = Math.max(
                (this.snippet.code.match(/\n/g) || []).length + 2,
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
}

@Component({
    selector: "td-polyglot-snippet",
    templateUrl: "polyglot-snippet.component.html",
    styleUrls: ["polyglot-snippet.component.scss"],
})
export class PolyglotSnippetComponent implements OnInit, AfterViewInit, OnDestroy {
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

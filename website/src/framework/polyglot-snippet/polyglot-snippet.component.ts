import { AsyncPipe, isPlatformBrowser, NgClass } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnInit, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { defer, filter, map, merge, Observable, shareReplay, startWith, Subject } from "rxjs";
import { sanitiseHtmlID } from "typedb-web-common/lib";
import { CodeSnippet, languages, PolyglotSnippet } from "typedb-web-schema/lib/code";
import { MediaQueryService } from "../../service/media-query.service";
import { CodeSnippetComponent } from "../code/code-snippet.component";
import { ScrollShadowComponent } from "../scroll-shadow/scroll-shadow.component";

const DEFAULT_MIN_LINES = { desktop: 33, mobile: 13 };

@Component({
    selector: "td-polyglot-snippet",
    templateUrl: "../polyglot-snippet/polyglot-snippet.component.html",
    styleUrls: ["../polyglot-snippet/polyglot-snippet.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ScrollShadowComponent, NgClass, CodeSnippetComponent, AsyncPipe]
})
export class PolyglotSnippetComponent implements OnInit, AfterViewInit {
    private readonly platformId = inject(PLATFORM_ID);
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
        this.lineNumbers$ = this.mediaQuery.isMobile$.pipe(
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
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                (window as any)["Prism"].highlightAllUnder(this._el.nativeElement);
            });
        }
    }

    snippetTabID(tab: CodeSnippet): string {
        return sanitiseHtmlID(`${this._elementID}-${(tab.tabText || tab.language)}`);
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

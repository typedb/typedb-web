import { AsyncPipe, isPlatformBrowser } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, inject, Input, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { sanitiseHtmlID } from "typedb-web-common/lib";
import { CodeSnippet, languages, PolyglotSnippet } from "typedb-web-schema";
import { MediaQueryService } from "../../service/media-query.service";
import { CodeSnippetComponent } from "../code/code-snippet.component";
import { IllustrationComponent } from "../illustration/illustration.component";
import { PolyglotSnippetComponent } from "../polyglot-snippet/polyglot-snippet.component";
import { RichTextComponent } from "../text/rich-text.component";

const DEFAULT_MIN_LINES = { desktop: 33, mobile: 13 };

@Component({
    selector: "td-polyglot-comparison",
    templateUrl: "./polyglot-comparison.component.html",
    styleUrls: ["./polyglot-comparison.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IllustrationComponent, RichTextComponent]
})
export class PolyglotComparisonComponent implements AfterViewInit {
    private readonly platformId = inject(PLATFORM_ID);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input({ required: true, alias: "snippet" }) polyglotSnippet!: PolyglotSnippet;
    @Input() setWindowHashOnTabClick = false;
    @Input({ required: true }) polyglotSnippetID!: string;

    private readonly tabClick$: Subject<CodeSnippet> = new Subject();
    private _elementID!: string;

    get languageDisplayNames() {
        return languages;
    }

    constructor(
        private router: Router, public media: MediaQueryService, private _el: ElementRef,
    ) {
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

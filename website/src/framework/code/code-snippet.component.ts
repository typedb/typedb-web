import { BreakpointObserver } from "@angular/cdk/layout";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import Prism from "prismjs";
import { CodeSnippet } from "typedb-web-schema";
import { MediaQueryService } from "../../service/media-query.service";

const MIN_LINES = { desktop: 22, mobile: 13 };

@Component({
    selector: "td-code-snippet",
    templateUrl: "code-snippet.component.html",
    styleUrls: ["code-snippet.component.scss"],
})
export class CodeSnippetComponent implements OnInit, AfterViewInit {
    @Input() snippet!: CodeSnippet;
    lines!: number;
    lineNumbers!: number[];

    constructor(private _mediaQuery: MediaQueryService) {}

    ngOnInit() {
        this._mediaQuery.isMobile.subscribe((isMobile) => {
            this.lines = Math.max((this.snippet.code.match(/\n/g) || []).length + 2, MIN_LINES[isMobile ? "mobile" : "desktop"]);
            this.lineNumbers = [...Array(this.lines).keys()].map(n => n + 1);
        });
    }

    ngAfterViewInit() {
        Prism.highlightAll();
    }
}

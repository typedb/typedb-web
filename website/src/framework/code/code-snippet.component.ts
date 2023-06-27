import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import Prism from "prismjs";
import { CodeSnippet } from "typedb-web-schema";

const MIN_LINES = 22;

@Component({
    selector: "td-code-snippet",
    templateUrl: "code-snippet.component.html",
    styleUrls: ["code-snippet.component.scss"],
})
export class CodeSnippetComponent implements OnInit, AfterViewInit {
    @Input() snippet!: CodeSnippet;
    lines!: number;
    lineNumbers!: number[];

    ngOnInit() {
        this.lines = Math.max((this.snippet.code.match(/\n/g) || []).length + 2, MIN_LINES);
        this.lineNumbers = [...Array(this.lines).keys()].map(n => n + 1);
    }

    ngAfterViewInit() {
        Prism.highlightAll();
    }
}

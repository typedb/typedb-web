import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import Prism from "prismjs";
import { CodeSnippet } from "typedb-web-schema";

@Component({
    selector: "td-code-snippet",
    templateUrl: "code-snippet.component.html",
    styleUrls: ["code-snippet.component.scss"],
})
export class CodeSnippetComponent implements OnInit, AfterViewInit {
    @Input() snippet!: CodeSnippet;
    @Input() lines!: number;
    lineNumbers!: number[];

    ngOnInit() {
        this.lineNumbers = [...Array(this.lines).keys()].map(n => n + 1);
    }

    ngAfterViewInit() {
        Prism.highlightAll();
    }
}

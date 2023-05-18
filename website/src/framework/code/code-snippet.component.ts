import { Component, Input, OnInit } from "@angular/core";
import { CodeSnippet } from "typedb-web-schema";

@Component({
    selector: "td-code-snippet",
    templateUrl: "code-snippet.component.html",
    styleUrls: ["code-snippet.component.scss"],
})
export class CodeSnippetComponent implements OnInit {
    @Input() snippet!: CodeSnippet;
    @Input() lines!: number;
    lineNumbers!: number[];

    ngOnInit() {
        this.lineNumbers = [...Array(this.lines).keys()].map(n => n + 1);
    }
}

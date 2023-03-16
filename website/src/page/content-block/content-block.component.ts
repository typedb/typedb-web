import { Component, Input } from "@angular/core";
import { PageContent } from "typedb-web-schema";

@Component({
    selector: "td-content-block",
    templateUrl: "./content-block.component.html",
    styleUrls: ["./content-block.component.scss"]
})
export class ContentBlockComponent {
    @Input() content!: PageContent;

    get contentType() {
        return "technicolorBlockChain";
    }
}

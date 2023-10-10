import { Component, Input } from "@angular/core";

import { WordpressTaxonomy } from "typedb-web-schema";

@Component({
    selector: "td-blog-category-chips",
    templateUrl: "./blog-category-chips.component.html",
    styleUrls: ["./blog-category-chips.component.scss"],
})
export class BlogCategoryChipsComponent {
    @Input() categories!: WordpressTaxonomy[];
}

import { Component, Input } from "@angular/core";

import { blogCategories, BlogCategoryID, BlogPost } from "typedb-web-schema";

@Component({
    selector: "td-blog-category-chips",
    templateUrl: "./blog-category-chips.component.html",
    styleUrls: ["./blog-category-chips.component.scss"],
})
export class BlogCategoryChipsComponent {
    @Input() post!: BlogPost;

    displayName(category: BlogCategoryID) {
        return blogCategories[category];
    }
}

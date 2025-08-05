
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { blogCategories, BlogCategoryID, BlogPost } from "typedb-web-schema";

import { LinkDirective } from "../../framework/link/link.directive";

@Component({
    selector: "td-blog-category-chips",
    templateUrl: "./blog-category-chips.component.html",
    styleUrls: ["./blog-category-chips.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LinkDirective]
})
export class BlogCategoryChipsComponent {
    @Input() post!: BlogPost;

    displayName(category: BlogCategoryID) {
        return blogCategories[category];
    }
}

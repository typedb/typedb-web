
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

import { blogCategories, BlogCategoryID, BlogPost } from "typedb-web-schema";

import { LinkDirective } from "../../framework/link/link.directive";

@Component({
    selector: "td-blog-category-chips",
    templateUrl: "./blog-category-chips.component.html",
    
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [LinkDirective]
})
export class BlogCategoryChipsComponent {
    @Input() post!: BlogPost;
    @Input() featured: boolean = false;

    displayName(category: BlogCategoryID) {
        return blogCategories[category];
    }
}

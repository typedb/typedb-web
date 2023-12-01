import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { BlogPostsRow, BlogRow, ResourcePanelsRow } from "typedb-web-schema";

@Component({
    selector: "td-blog-row",
    templateUrl: "./blog-row.component.html",
    styleUrls: ["./blog-row.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogRowComponent {
    @Input() row!: BlogRow;

    get posts(): BlogPostsRow | undefined {
        return this.row instanceof BlogPostsRow ? this.row : undefined;
    }

    get resourcePanelsRow(): ResourcePanelsRow | undefined {
        return "rowIndex" in this.row ? this.row : undefined;
    }
}

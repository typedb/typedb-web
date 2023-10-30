import { Component, Input } from "@angular/core";
import { BlogPostsRow, BlogRow } from "typedb-web-schema";

@Component({
    selector: "td-blog-row",
    templateUrl: "./blog-row.component.html",
    styleUrls: ["./blog-row.component.scss"],
})
export class BlogRowComponent {
    @Input() row!: BlogRow;

    get posts(): BlogPostsRow | undefined {
        return this.row instanceof BlogPostsRow ? this.row : undefined;
    }
}

import { Component, Input } from "@angular/core";

import { BlogPost } from "typedb-web-schema";

@Component({
    selector: "td-blog-authorship-bar",
    templateUrl: "./blog-authorship-bar.component.html",
    styleUrls: ["./blog-authorship-bar.component.scss"],
})
export class BlogAuthorshipBarComponent {
    @Input() post!: BlogPost;
    @Input() size: "medium" | "small" = "small";
}

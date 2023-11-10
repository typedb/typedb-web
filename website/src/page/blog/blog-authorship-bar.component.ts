import { Component, HostBinding, Input } from "@angular/core";

import { BlogPost } from "typedb-web-schema";

@Component({
    selector: "td-blog-authorship-bar",
    templateUrl: "./blog-authorship-bar.component.html",
    styleUrls: ["./blog-authorship-bar.component.scss"],
})
export class BlogAuthorshipBarComponent {
    @Input() disableLink = false;
    @Input() post!: BlogPost;
    @Input() size: "medium" | "small" = "small";

    @HostBinding("class.bp-author-small") get isSmall() {
        return this.size === "small";
    }
}

import { Component, HostBinding, Input } from "@angular/core";
import { WordpressPost } from "typedb-web-schema";

@Component({
    selector: "td-blog-authorship-bar",
    templateUrl: "./blog-authorship-bar.component.html",
    styleUrls: ["./blog-authorship-bar.component.scss"],
})
export class BlogAuthorshipBarComponent {
    @Input() post!: WordpressPost;
    @Input() size: "medium" | "small" = "small";
    @Input() variant: "tertiary" | "none" = "none";

    @HostBinding("class.bp-author-small") get isSmall() {
        return this.size === "small";
    }

    @HostBinding("class.variant-tertiary") get isTertiaryPost() {
        return this.variant === "tertiary";
    }
}

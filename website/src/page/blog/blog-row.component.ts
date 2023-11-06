import { Component, Input } from "@angular/core";

import { BlogPost, blogPostBackupHeroImageURL, BlogPostsRow, BlogRow, Link, ResourcePanelsRow } from "typedb-web-schema";

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

    get resourcePanelsRow(): ResourcePanelsRow | undefined {
        return "rowIndex" in this.row ? this.row : undefined;
    }

    readPostLink(post: BlogPost): Link {
        return new Link({
            type: "route",
            destination: `/blog/${post.slug}`,
            opensNewTab: false,
        });
    }

    heroImageURL(post: BlogPost): string {
        if (post.imageURL) return post.imageURL;
        else return blogPostBackupHeroImageURL(post.slug);
    }
}

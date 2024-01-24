
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { BlogPostsRow, BlogRow, ResourcePanelsRow } from "typedb-web-schema";

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ResourcePanelsComponent } from "../../framework/link-panels/link-panels.component";
import { LinkDirective } from "../../framework/link/link.directive";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { BlogAuthorshipBarComponent } from "./blog-authorship-bar.component";
import { BlogCategoryChipsComponent } from "./blog-category-chips.component";

@Component({
    selector: "td-blog-row",
    templateUrl: "./blog-row.component.html",
    styleUrls: ["./blog-row.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    LinkDirective,
    AspectRatioComponent,
    BlogCategoryChipsComponent,
    RichTextComponent,
    BlogAuthorshipBarComponent,
    HeadingWithHighlightsComponent,
    ResourcePanelsComponent,
    PlainTextPipe
],
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

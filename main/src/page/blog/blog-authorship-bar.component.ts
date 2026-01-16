import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

import { BlogPost } from "typedb-web-schema";

import { PersonInfoComponent } from "../../framework/person/person.component";

@Component({
    selector: "td-blog-authorship-bar",
    templateUrl: "./blog-authorship-bar.component.html",
    styleUrls: ["./blog-authorship-bar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [PersonInfoComponent, DatePipe]
})
export class BlogAuthorshipBarComponent {
    @Input() post!: BlogPost;
    @Input() size: "medium" | "small" = "small";
    @Input() variant: "listPage" | "postPage" = "listPage";
}

import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { BlogPost } from "typedb-web-schema";

import { PersonInfoComponent } from "../../framework/person/person.component";

@Component({
    selector: "td-blog-authorship-bar",
    templateUrl: "./blog-authorship-bar.component.html",
    styleUrls: ["./blog-authorship-bar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PersonInfoComponent, DatePipe]
})
export class BlogAuthorshipBarComponent {
    @Input() post!: BlogPost;
    @Input() size: "medium" | "small" = "small";
}

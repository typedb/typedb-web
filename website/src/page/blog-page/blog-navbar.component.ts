import { Component } from "@angular/core";
import { concat, map, merge, Observable, of, scan, startWith } from "rxjs";
import { Link } from "typedb-web-schema";
import { BlogService } from "../../service/blog.service";

@Component({
    selector: "[td-blog-navbar]",
    templateUrl: "./blog-navbar.component.html",
    styleUrls: ["./blog-navbar.component.scss"],
})
export class BlogNavbarComponent {
    items$: Observable<NavbarItem[]>;

    constructor(private blogService: BlogService) {
        this.items$ = this.blogService.categories$.pipe(
            startWith([]),
            map((categories) =>
                categories.map((category) => ({
                    text: category.name,
                    link: new Link({
                        destination: `/blog/category/${category.slug}`,
                        type: "route",
                        opensNewTab: false,
                    }),
                })),
            ),
            scan(
                (acc, curr) => acc.concat(curr),
                [{ text: "All Posts", link: new Link({ destination: "/blog", type: "route", opensNewTab: false }) }],
            ),
        );
    }
}

type NavbarItem = { text: string; link: Link };

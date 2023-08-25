import { Component, HostBinding, Input } from "@angular/core";
import { concat, map, merge, Observable, of, scan, startWith } from "rxjs";
import { BlogFilter, Link } from "typedb-web-schema";
import { BlogService } from "../../service/blog.service";

@Component({
    selector: "[td-blog-navbar]",
    templateUrl: "./blog-navbar.component.html",
    styleUrls: ["./blog-navbar.component.scss"],
})
export class BlogNavbarComponent {
    @Input() variant!: "listPage" | "postPage";
    items$: Observable<NavbarItem[]>;
    activeFilter!: BlogFilter;

    constructor(private blogService: BlogService) {
        this.items$ = this.blogService.categories.pipe(
            startWith([]),
            map((categories) =>
                categories.map((category) => ({
                    text: category.name,
                    slug: category.slug,
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
        // TODO: refactor
        this.filter$.subscribe((filter) => {
            this.activeFilter = filter;
        });
    }

    get filter$() {
        return this.blogService.filter;
    }

    isActive(item: NavbarItem) {
        return false;
    }

    get fontSizeClass() {
        return this.variant === "listPage" ? "text-18-26" : "text-16-24";
    }

    @HostBinding("class.bn-variant-post-page") get isPostPage() {
        return this.variant === "postPage";
    }
}

type NavbarItem = { text: string; slug?: string; link: Link };

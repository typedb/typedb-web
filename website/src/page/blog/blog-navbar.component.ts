import { Component, HostBinding, Input } from "@angular/core";

import { blogCategories, blogCategoryList, BlogFilter, Link } from "typedb-web-schema";

import { WordpressService } from "../../service/wordpress.service";

@Component({
    selector: "td-blog-navbar, [td-blog-navbar]",
    templateUrl: "./blog-navbar.component.html",
    styleUrls: ["./blog-navbar.component.scss"],
})
export class BlogNavbarComponent {
    @Input() variant!: "listPage" | "postPage";
    items: NavbarItem[];
    activeFilter!: BlogFilter;

    constructor(private blogService: WordpressService) {
        this.items = [
            { text: "All Posts", link: new Link({ destination: "/blog", type: "route", opensNewTab: false }) },
            ...blogCategoryList.map((categorySlug) => ({
                text: blogCategories[categorySlug],
                slug: categorySlug,
                link: new Link({
                    destination: `/blog/category/${categorySlug}`,
                    type: "route",
                    opensNewTab: false,
                }),
            })),
        ];
        // TODO: refactor
        this.filter$.subscribe((filter) => {
            this.activeFilter = filter;
        });
    }

    get filter$() {
        return this.blogService.filter;
    }

    isActive(_item: NavbarItem) {
        return false;
    }

    get fontSizeClass() {
        return this.variant === "listPage" ? "text-p1" : "text-p2";
    }

    @HostBinding("class.bn-variant-post-page") get isPostPage() {
        return this.variant === "postPage";
    }
}

type NavbarItem = { text: string; slug?: string; link: Link };

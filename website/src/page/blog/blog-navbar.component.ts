import { NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

import { blogCategories, blogCategoryList, Link } from "typedb-web-schema";

import { LinkDirective } from "../../framework/link/link.directive";
import { ScrollShadowComponent } from "../../framework/scroll-shadow/scroll-shadow.component";

@Component({
    selector: "td-blog-navbar, [td-blog-navbar]",
    templateUrl: "./blog-navbar.component.html",
    styleUrls: ["./blog-navbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ScrollShadowComponent, NgFor, LinkDirective],
})
export class BlogNavbarComponent {
    @Input() variant!: "listPage" | "postPage";
    @HostBinding("class.bn-variant-post-page") get isPostPage() {
        return this.variant === "postPage";
    }

    readonly items: NavbarItem[];
    // activeFilter!: BlogFilter;

    // get filter$() {
    //     return this.content.blogFilter;
    // }

    get fontSizeClass() {
        return this.variant === "listPage" ? "text-p1" : "text-p2";
    }

    constructor() {
        // private content: ContentService
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
        // // TODO: refactor
        // this.filter$.subscribe((filter) => {
        //     this.activeFilter = filter;
        // });
    }

    itemClicked(ev: MouseEvent): void {
        const item = ev.currentTarget;
        if (item instanceof HTMLElement) {
            item.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center" });
        }
    }
}

type NavbarItem = { text: string; slug?: string; link: Link };

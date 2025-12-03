import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { BehaviorSubject, combineLatest, filter, map, Observable, shareReplay } from "rxjs";
import {
    Blog, blogCategories, BlogCategoryID, blogCategoryList, blogNullFilter, BlogPost, BlogPostsRow, BlogRow, blogSchemaName,
    Link,
    LinkButton,
    SanityBlog,
} from "typedb-web-schema";

import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";

import { LinkDirective } from "../../framework/link/link.directive";
import {
    HeadingWithHighlightsComponent,
    ParagraphWithHighlightsComponent,
} from "../../framework/text/text-with-highlights.component";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";
import { BlogNavbarComponent } from "./blog-navbar.component";
import { BlogRowComponent } from "./blog-row.component";
import { ButtonComponent } from "src/framework/button/button.component";
import { MatPaginator } from "@angular/material/paginator";
import { V } from "@angular/cdk/scrolling-module.d-C_w4tIrZ";

@Component({
    selector: "td-blog-list-page",
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        BlogNavbarComponent, BlogRowComponent, AsyncPipe, ButtonComponent, MatPaginator
    ]
})
export class BlogComponent implements OnInit {
    readonly blog$: Observable<Blog | null>;
    readonly rows$: Observable<BlogRow[]>;
    readonly displayedRows$: Observable<BlogRow[]>;
    @ViewChild(MatPaginator) readonly paginator?: MatPaginator;
    currentPage$ = new BehaviorSubject(1);
    pageSize$ = new BehaviorSubject(9);
    readonly posts$: Observable<BlogPost[]>;

    readonly subscribeToNewsletterButton = new LinkButton({
        id: "subscribe-to-newsletter",
        style: "greenHollow",
        link: Link.fromAddress("?dialog=newsletter"),
        text: "Subscribe",
        comingSoon: false,
    });

    constructor(
        private router: Router, private route: ActivatedRoute, private content: ContentService, private title: Title,
        private metaTags: MetaTagsService, destroyRef: DestroyRef, topbarMenuService: TopbarMenuService,
    ) {
        topbarMenuService.registerPageOffset(100, destroyRef);
        this.blog$ = this.content.data.pipe(
            map((data) => {
                const sanityBlog = data.getDocumentByID<SanityBlog>(blogSchemaName);
                return sanityBlog ? new Blog(sanityBlog, data) : null;
            }),
            shareReplay(1),
        );
        this.rows$ = combineLatest([this.blog$, this.content.displayedPosts, this.content.blogFilter]).pipe(
            map(([blog, posts, filter]) => {
                if (!blog) {
                    return [];
                }

                const rows = [];
                let currentRowIndex = 0;
                const selectedTabSlug = ("categorySlug" in filter && (filter.categorySlug as BlogCategoryID)) || "all";
                const selectedTab = blog.tabs[selectedTabSlug];
                for (let i = 0; i < posts.length; i++) {
                    const additionalRow = selectedTab.additionalRows.find((x) => x.rowIndex === currentRowIndex);
                    if (additionalRow) {
                        rows.push(additionalRow);
                        currentRowIndex++;
                        i--;
                        continue;
                    }
                    if (i === 0) {
                        rows.push(new BlogPostsRow({ level: "primary", posts: [posts[i]] }));
                    } else {
                        rows.push(new BlogPostsRow({ level: "secondary", posts: [posts[i], posts[i + 1], posts[i + 2]] }));
                        i += 2;
                    }
                    currentRowIndex++;
                }
                const furtherAdditionalRows = selectedTab.additionalRows
                    .filter((x) => x.rowIndex >= currentRowIndex)
                    .sort((a, b) => a.rowIndex - b.rowIndex);
                rows.push(...furtherAdditionalRows);
                return rows;
            }),
        );
        this.displayedRows$ = combineLatest([this.rows$, this.currentPage$, this.pageSize$]).pipe(
            map(([rows, currentPage, pageSize]) => {
                const startIndex = (currentPage - 1) * pageSize / 3 + 1;
                return rows.slice(startIndex, startIndex + pageSize / 3);
            }),
        );
        this.posts$ = this.content.blogPosts;
    }

    ngOnInit(): void {
        this.blog$.subscribe((blog) => {
            if (!blog) {
                this.router.navigate(["404"], { skipLocationChange: true });
                return;
            }
        });

        combineLatest([
            this.blog$.pipe(filter((blog): blog is Blog => !!blog)),
            this.route.paramMap.pipe(
                map((params) => {
                    const categorySlug = params.get("slug");
                    return categorySlug ? { categorySlug } : blogNullFilter();
                }),
            ),
        ]).subscribe({
            next: ([blog, filter]) => {
                this.content.blogFilter.next(filter);
                let categorySlug: "all" | BlogCategoryID = "all";
                if ("categorySlug" in filter) {
                    categorySlug = filter.categorySlug as BlogCategoryID;
                    if (!blogCategoryList.includes(categorySlug)) throw `Unknown category slug: ${categorySlug}`;
                    this.title.setTitle(`TypeDB Blog: ${blogCategories[categorySlug]}`);
                } else {
                    this.title.setTitle(`TypeDB Blog`);
                }
                this.metaTags.register(blog.tabs[categorySlug].metaTags);
            },
            error: () => {
                this.router.navigate(["404"], { skipLocationChange: true });
            },
        });
    }

    onPageChange(event: { pageIndex: number; pageSize: number }): void {
        this.currentPage$.next(event.pageIndex + 1);
        this.pageSize$.next(event.pageSize);
    }
}

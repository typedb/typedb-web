import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

import { IdleMonitorService } from "@scullyio/ng-lib";
import { combineLatest, filter, map, Observable, shareReplay } from "rxjs";
import {
    Blog, blogCategories, BlogCategoryID, blogCategoryList, blogNullFilter, BlogPostsRow, BlogRow, blogSchemaName,
    SanityBlog,
} from "typedb-web-schema";

import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";

import { LinkDirective } from "../../framework/link/link.directive";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import {
    HeadingWithHighlightsComponent,
    ParagraphWithHighlightsComponent,
} from "../../framework/text/text-with-highlights.component";
import { ContentService } from "../../service/content.service";
import { MetaTagsService } from "../../service/meta-tags.service";
import { BlogNavbarComponent } from "./blog-navbar.component";
import { BlogRowComponent } from "./blog-row.component";

@Component({
    selector: "td-blog-list-page",
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, LinkDirective, HeadingWithHighlightsComponent, ParagraphWithHighlightsComponent,
        BlogNavbarComponent, BlogRowComponent, AsyncPipe
    ],
})
export class BlogComponent implements OnInit {
    readonly blog$: Observable<Blog | null>;
    readonly rows$: Observable<BlogRow[]>;

    constructor(
        private router: Router, private route: ActivatedRoute, private content: ContentService, private title: Title,
        private metaTags: MetaTagsService, private _idleMonitor: IdleMonitorService, destroyRef: DestroyRef,
        topbarMenuService: TopbarMenuService,
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
                    if (i === 0 || posts[i].level === "primary") {
                        rows.push(new BlogPostsRow({ level: "primary", posts: [posts[i]] }));
                    } else if (posts[i].level === "tertiary" || i === posts.length - 1) {
                        rows.push(new BlogPostsRow({ level: "tertiary", posts: [posts[i]] }));
                    } else {
                        rows.push(new BlogPostsRow({ level: "secondary", posts: [posts[i], posts[i + 1]] }));
                        i++;
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
    }

    ngOnInit(): void {
        this.blog$.subscribe((blog) => {
            if (!blog) {
                this.router.navigate(["404"], { skipLocationChange: true });
                return;
            }
            setTimeout(() => {
                this._idleMonitor.fireManualMyAppReadyEvent();
            }, 60000);
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
}

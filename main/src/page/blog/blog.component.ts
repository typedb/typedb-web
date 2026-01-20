import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, RouterLink } from "@angular/router";

import { combineLatest, distinctUntilChanged, filter, map, Observable, shareReplay } from "rxjs";
import {
    ActionButton,
    Blog, blogCategories, BlogCategoryID, blogCategoryList, blogNullFilter, BlogPost, BlogPostsRow, BlogRow, blogSchemaName,
    SanityBlog,
} from "typedb-web-schema";

import { TopbarMenuService } from "src/navigation/topbar/topbar-menu.service";

import {
    HeadingWithHighlightsComponent,
    ParagraphWithHighlightsComponent,
} from "../../framework/text/text-with-highlights.component";
import { ContentService } from "../../service/content.service";
import { JsonLdService } from "../../service/json-ld.service";
import { MetaTagsService } from "../../service/meta-tags.service";
import { CanonicalLinkService } from "../../service/canonical-link.service";
import { BlogNavbarComponent } from "./blog-navbar.component";
import { BlogRowComponent } from "./blog-row.component";
import { ButtonComponent } from "src/framework/button/button.component";
import { DialogService } from "src/service/dialog.service";

export const BLOG_PAGE_SIZE = 9;

@Component({
    selector: "td-blog-list-page",
    templateUrl: "./blog.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        BlogNavbarComponent, BlogRowComponent, AsyncPipe, ButtonComponent, RouterLink,
        HeadingWithHighlightsComponent, ParagraphWithHighlightsComponent,
    ]
})
export class BlogComponent implements OnInit {
    readonly blog$: Observable<Blog | null>;
    readonly rows$: Observable<BlogRow[]>;
    readonly displayedRows$: Observable<BlogRow[]>;
    readonly currentPage$: Observable<number>;
    readonly totalPages$: Observable<number>;
    readonly posts$: Observable<BlogPost[]>;
    readonly categorySlug$: Observable<BlogCategoryID | null>;
    dialog = inject(DialogService);

    readonly subscribeToNewsletterButton = new ActionButton({
        id: "subscribe-to-newsletter",
        style: "greenHollow",
        onClick: () => this.dialog.openNewsletterDialog(),
        text: "Subscribe to newsletter",
        comingSoon: false,
    });

    constructor(
        private route: ActivatedRoute, private content: ContentService,
        private jsonLd: JsonLdService, private metaTags: MetaTagsService, private title: Title,
        private canonicalLink: CanonicalLinkService, destroyRef: DestroyRef, topbarMenuService: TopbarMenuService,
    ) {
        topbarMenuService.registerPageOffset(100, destroyRef);

        // Extract category slug from route params
        this.categorySlug$ = this.route.paramMap.pipe(
            map((params) => {
                const slug = params.get("slug");
                return slug && blogCategoryList.includes(slug as BlogCategoryID) ? slug as BlogCategoryID : null;
            }),
            shareReplay(1),
        );

        // Extract current page from route params (defaults to 1)
        this.currentPage$ = this.route.paramMap.pipe(
            map((params) => {
                const page = params.get("page");
                const pageNum = page ? parseInt(page, 10) : 1;
                return isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;
            }),
            shareReplay(1),
        );

        this.blog$ = this.content.data.pipe(
            map((data) => {
                const sanityBlog = data.getDocumentByID<SanityBlog>(blogSchemaName);
                return sanityBlog ? new Blog(sanityBlog, data) : null;
            }),
            shareReplay(1),
        );

        this.posts$ = this.content.displayedPosts;

        // Calculate total pages based on post count
        this.totalPages$ = this.posts$.pipe(
            map((posts) => Math.ceil(posts.length / BLOG_PAGE_SIZE)),
            shareReplay(1),
        );

        this.rows$ = combineLatest([this.blog$, this.content.displayedPosts, this.content.blogFilter]).pipe(
            map(([blog, posts, blogFilter]) => {
                if (!blog) {
                    return [];
                }

                const rows = [];
                let currentRowIndex = 0;
                const selectedTabSlug = ("categorySlug" in blogFilter && (blogFilter.categorySlug as BlogCategoryID)) || "all";
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

        // Paginate rows based on current page
        // Each "page" shows BLOG_PAGE_SIZE posts (1 primary + (BLOG_PAGE_SIZE-1)/3 secondary rows)
        // Note: rows[0] is rendered separately in template as the "hero" post
        const rowsPerPage = 1 + (BLOG_PAGE_SIZE - 1) / 3; // 1 primary row + 2-3 secondary rows
        this.displayedRows$ = combineLatest([this.rows$, this.currentPage$]).pipe(
            map(([rows, currentPage]) => {
                if (currentPage === 1) {
                    // First page: skip first row (rendered separately as hero) and show remaining rows
                    // rowsPerPage ≈ 3.67, so we show rows[1..3] (indices 1,2,3) plus the hero = 4 rows total
                    return rows.slice(1, Math.ceil(rowsPerPage));
                }
                // Subsequent pages: skip the first row (primary from page 1) and paginate the rest
                const startIndex = 1 + (currentPage - 1) * rowsPerPage;
                return rows.slice(startIndex, startIndex + rowsPerPage);
            }),
        );
    }

    getPageUrl(page: number): string {
        const categorySlug = this.route.snapshot.paramMap.get("slug");
        if (page === 1) {
            return categorySlug ? `/blog/category/${categorySlug}` : "/blog";
        }
        return categorySlug ? `/blog/category/${categorySlug}/page/${page}` : `/blog/page/${page}`;
    }

    ngOnInit(): void {
        this.blog$.subscribe((blog) => {
            if (!blog) {
                this.content.handleContentNotFound();
                return;
            }
        });

        // Update blog filter separately from the metadata subscription to avoid circular dependencies
        this.route.paramMap.pipe(
            map((params) => {
                const categorySlug = params.get("slug");
                return categorySlug ? { categorySlug } : blogNullFilter();
            }),
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        ).subscribe((blogFilter) => {
            this.content.blogFilter.next(blogFilter);
        });

        combineLatest([
            this.blog$.pipe(filter((blog): blog is Blog => !!blog)),
            this.categorySlug$,
            this.currentPage$,
            this.totalPages$.pipe(distinctUntilChanged()),
        ]).subscribe({
            next: ([blog, routeCategorySlug, currentPage, totalPages]) => {
                const tabSlug: "all" | BlogCategoryID = routeCategorySlug || "all";
                let pageTitle: string;
                let pageUrl: string;
                let basePath: string;
                if (routeCategorySlug) {
                    if (!blogCategoryList.includes(routeCategorySlug)) throw `Unknown category slug: ${routeCategorySlug}`;
                    pageTitle = `TypeDB Blog: ${blogCategories[routeCategorySlug]}`;
                    pageUrl = `https://typedb.com/blog/category/${routeCategorySlug}`;
                    basePath = `/blog/category/${routeCategorySlug}`;
                } else {
                    pageTitle = `TypeDB Blog`;
                    pageUrl = `https://typedb.com/blog`;
                    basePath = `/blog`;
                }
                // Append page number to title and URL if not on first page
                if (currentPage > 1) {
                    pageTitle += ` - Page ${currentPage}`;
                    pageUrl += `/page/${currentPage}`;
                }
                this.title.setTitle(pageTitle);
                this.metaTags.register(blog.tabs[tabSlug].metaTags);
                this.jsonLd.setForBlogListing(pageTitle, blog.tabs[tabSlug].metaTags.description, pageUrl);

                // Set canonical URL to base path for page 1 (e.g., /blog/page/1 -> /blog)
                if (currentPage === 1) {
                    this.canonicalLink.setCanonical(`https://typedb.com${basePath}`);
                }

                // Set pagination links for SEO
                const prevUrl = currentPage > 1
                    ? (currentPage === 2 ? basePath : `${basePath}/page/${currentPage - 1}`)
                    : null;
                const nextUrl = currentPage < totalPages ? `${basePath}/page/${currentPage + 1}` : null;
                this.canonicalLink.setPaginationLinks(prevUrl, nextUrl);
            },
            error: () => {
                this.content.handleContentNotFound();
            },
        });
    }
}

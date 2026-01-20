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

        // Total pages: hero is always shown, then BLOG_PAGE_SIZE posts per page
        // Posts 1-9 on page 1, posts 10-18 on page 2, etc.
        this.totalPages$ = this.posts$.pipe(
            map((posts) => {
                if (posts.length <= 1) return 1;
                return Math.ceil((posts.length - 1) / BLOG_PAGE_SIZE);
            }),
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

        // Paginate by posts: hero (post 0) always shown, then 9 posts per page
        // Page 1: posts 1-9, Page 2: posts 10-18, etc.
        this.displayedRows$ = combineLatest([this.blog$, this.content.displayedPosts, this.currentPage$]).pipe(
            map(([blog, posts, currentPage]) => {
                if (!blog || posts.length <= 1) return [];

                // Calculate which posts to show on this page (excluding hero)
                const startPostIndex = 1 + (currentPage - 1) * BLOG_PAGE_SIZE;
                const endPostIndex = Math.min(startPostIndex + BLOG_PAGE_SIZE, posts.length);
                const pagePosts = posts.slice(startPostIndex, endPostIndex);

                if (pagePosts.length === 0) return [];

                // Build rows from the page's posts (groups of 3)
                const rows: BlogRow[] = [];

                for (let i = 0; i < pagePosts.length; i += 3) {
                    const rowPosts = pagePosts.slice(i, Math.min(i + 3, pagePosts.length));
                    rows.push(new BlogPostsRow({ level: "secondary", posts: rowPosts }));
                }

                return rows;
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

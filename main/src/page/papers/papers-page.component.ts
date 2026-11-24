import { AsyncPipe, NgOptimizedImage, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import { RouterLink } from "@angular/router";

import { combineLatest, map, Observable, of, shareReplay } from "rxjs";
import {
    ActionButton, SanityDataset, SanityPapersPage, Paper, PapersPage, papersPageSchemaName,
} from "typedb-web-schema";

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../../framework/button/button.component";
import { IconComponent } from "../../framework/icon/icon.component";
import { LinkDirective } from "../../framework/link/link.directive";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { CanonicalLinkService } from "../../service/canonical-link.service";
import { DialogService } from "../../service/dialog.service";
import { PageComponentBase } from "../page-component-base";

export const PAPERS_PAGE_SIZE = 9;
const PAPERS_PER_ROW = 3;

@Component({
    selector: "td-papers-page",
    templateUrl: "./papers-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        AspectRatioComponent, RichTextComponent, ButtonComponent, AsyncPipe, PlainTextPipe, NgOptimizedImage,
        LinkDirective, RouterLink, HeadingWithHighlightsComponent, IconComponent, NgTemplateOutlet,
    ]
})
export class PapersPageComponent extends PageComponentBase<PapersPage> {
    private dialog = inject(DialogService);
    private canonicalLink = inject(CanonicalLinkService);

    readonly currentPage$: Observable<number> = this.activatedRoute.paramMap.pipe(
        map((params) => {
            const page = parseInt(params.get("page") || "1", 10);
            return isNaN(page) || page < 1 ? 1 : page;
        }),
        shareReplay(1),
    );

    readonly subscribeToNewsletterButton = new ActionButton({
        id: "subscribe-to-newsletter",
        style: "greenHollow",
        onClick: () => this.dialog.openNewsletterDialog(),
        text: "Subscribe to newsletter",
        comingSoon: false,
    });

    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityPapersPage>(papersPageSchemaName);
        return of(page ? new PapersPage(page, data) : null);
    }

    protected override onPageReady(page: PapersPage): void {
        super.onPageReady(page);
        combineLatest([this.currentPage$, of(this.totalPages(page.papersList))]).subscribe(([currentPage, totalPages]) => {
            const baseTitle = page.metaTags.title || "TypeDB Research";
            this.title.setTitle(currentPage > 1 ? `${baseTitle} - Page ${currentPage}` : baseTitle);
            if (currentPage === 1) this.canonicalLink.setCanonical("https://typedb.com/papers");
            this.canonicalLink.setPaginationLinks(
                currentPage > 1 ? this.pageUrl(currentPage - 1) : null,
                currentPage < totalPages ? this.pageUrl(currentPage + 1) : null,
            );
        });
    }

    totalPages(papers: Paper[]): number {
        return Math.max(1, Math.ceil(papers.length / PAPERS_PAGE_SIZE));
    }

    rows(papers: Paper[], page: number): Paper[][] {
        const pagePapers = papers.slice((page - 1) * PAPERS_PAGE_SIZE, page * PAPERS_PAGE_SIZE);
        const rows: Paper[][] = [];
        for (let i = 0; i < pagePapers.length; i += PAPERS_PER_ROW) rows.push(pagePapers.slice(i, i + PAPERS_PER_ROW));
        return rows;
    }

    formatAuthors(authors: string[]): string {
        if (authors.length > 2) return `${authors[0]} et al.`;
        return authors.join(" and ");
    }

    /** Shows "2025-05" or "2025-05-20" as "May 2025", and a bare year as is. */
    formatDate(date: string): string {
        const [year, month] = date.split("-").map(Number);
        if (!month) return String(year);
        const monthName = new Date(Date.UTC(year, month - 1, 1)).toLocaleString("en-US", { month: "short", timeZone: "UTC" });
        return `${monthName} ${year}`;
    }

    pageUrl(page: number): string {
        return page === 1 ? "/papers" : `/papers/page/${page}`;
    }
}

import { AsyncPipe, NgOptimizedImage, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from "@angular/core";

import { of } from "rxjs";
import {
    ActionButton, SanityDataset, SanityPapersPage, Paper, PapersPage, papersPageSchemaName, researchCategories,
} from "typedb-web-schema";

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../../framework/button/button.component";
import { IconComponent } from "../../framework/icon/icon.component";
import { LinkDirective } from "../../framework/link/link.directive";
import { OrganisationLogosComponent } from "../../framework/organisation-logos/organisation-logos.component";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { HeadingWithHighlightsComponent } from "../../framework/text/text-with-highlights.component";
import { DialogService } from "../../service/dialog.service";
import { PageComponentBase } from "../page-component-base";

interface PaperGroup {
    id: string;
    name: string;
    papers: Paper[];
}

const OTHER_CATEGORY = { value: "other", title: "Other" };

@Component({
    selector: "td-research-landing-page",
    templateUrl: "./research-landing-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        AspectRatioComponent, RichTextComponent, ButtonComponent, AsyncPipe, PlainTextPipe, NgOptimizedImage,
        LinkDirective, HeadingWithHighlightsComponent, IconComponent, NgTemplateOutlet, OrganisationLogosComponent,
    ]
})
export class ResearchLandingPageComponent extends PageComponentBase<PapersPage> {
    private dialog = inject(DialogService);

    readonly query = signal("");

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

    /** Papers grouped by category in the categories' set order, narrowed to those matching the search */
    filtered(papers: Paper[]): PaperGroup[] {
        const needle = this.query().trim().toLowerCase();
        return [...researchCategories, OTHER_CATEGORY]
            .map(({ value, title }) => ({
                id: value,
                name: title,
                papers: papers.filter((paper) =>
                    (paper.category || OTHER_CATEGORY.value) === value
                    && (!needle || this.searchText(paper, title).includes(needle))),
            }))
            .filter((group) => group.id !== OTHER_CATEGORY.value || group.papers.length);
    }

    private searchText(paper: Paper, categoryName: string): string {
        return [
            paper.title.toPlainText(), paper.authors.join(" "), paper.shortDescription, paper.focus, categoryName,
        ].join(" ").toLowerCase();
    }

    hasResults(groups: PaperGroup[]) {
        return groups.some((x) => x.papers.length);
    }

    // The page has a <base href>, so a bare "#id" link would leave the page
    scrollTo(event: Event, id: string) {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
}

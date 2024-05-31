import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { map } from "rxjs";
import { SanityDataset, SanitySolutionPage, SolutionPage, solutionPageSchemaName } from "typedb-web-schema";
import { SectionBase } from "typedb-web-schema";

import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-solution-page",
    templateUrl: "./solution-page.component.html",
    styleUrls: ["./solution-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionPageComponent extends PageComponentBase<SolutionPage> {
    protected override getPage(data: SanityDataset) {
        return this.activatedRoute.paramMap.pipe(
            map((params) => {
                const sanitySolutionPages = data.getDocumentsByType<SanitySolutionPage>(solutionPageSchemaName);
                const page = sanitySolutionPages.find((x) => x.route.current === params.get("route"));
                return page ? new SolutionPage(page, data) : null;
            }),
        );
    }

    protected override onPageReady(page: SolutionPage): void {
        super.onPageReady(page);
        this.title.setTitle(`TypeDB Solutions: ${page.title}`);
    }
}

@Component({
    selector: "td-solution-page-core-section",
    template: `<td-core-section
        [section]="block"
        [index]="index + 1"
        [noUpperLine]="index === 0"
        [noTrailingLine]="noTrailingLine"
    ></td-core-section>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionPageCoreSectionComponent {
    @Input() block!: SectionBase;
    @Input() page!: SolutionPage;

    get allBlocks(): SectionBase[] {
        return [
            this.page.useCasesSection,
            this.page.challengesSection,
            this.page.solutionSection,
            this.page.furtherReadingSection,
        ].filter((x) => !!x) as SectionBase[];
    }

    get index() {
        return this.allBlocks.indexOf(this.block);
    }

    get noTrailingLine() {
        return this.index >= this.allBlocks.length - 1;
    }
}

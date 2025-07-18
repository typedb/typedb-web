import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";
import { SanityDataset, SanitySolutionPage, SolutionPage, solutionPageSchemaName } from "typedb-web-schema";
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
                const page = sanitySolutionPages.find((x) => x.route.current === params.get("slug"));
                return page ? new SolutionPage(page, data) : null;
            }),
        );
    }

    protected override onPageReady(page: SolutionPage): void {
        super.onPageReady(page);
        this.title.setTitle(`TypeDB Solutions: ${page.title}`);
    }
}

import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";
import { SanityDataset, SanityUseCasePageInstance, UseCasePageInstance, useCasePageSchemaName } from "typedb-web-schema";
import { KeyPointPanels2x2Component } from "../../framework/key-point/key-point-panels-2x2.component";
import { PolyglotComparisonComponent } from "../../framework/polyglot-comparison/polyglot-comparison.component";
import { TitleBodyIllustrationSectionComponent } from "../../framework/section/illustration/title-body-illustration-section.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-use-case-page",
    templateUrl: "./use-case-page.component.html",
    styleUrls: ["./use-case-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe, KeyPointPanels2x2Component, PolyglotComparisonComponent, SectionCoreComponent,
        TitleBodyIllustrationSectionComponent
    ]
})
export class UseCasePageComponent extends PageComponentBase<UseCasePageInstance> {
    protected override getPage(db: SanityDataset) {
        return this.activatedRoute.paramMap.pipe(
            map((params) => {
                const sanityUseCasePageInstances = db.getDocumentsByType<SanityUseCasePageInstance>(useCasePageSchemaName);
                const page = sanityUseCasePageInstances.find((x) => x.route.current === params.get("slug"));
                return page ? new UseCasePageInstance(page, db) : null;
            }),
        );
    }

    protected override onPageReady(page: UseCasePageInstance): void {
        super.onPageReady(page);
        this.title.setTitle(`TypeDB for ${page.title}`);
    }
}

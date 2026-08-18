import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { map } from "rxjs";
import { SanityDataset, SanityUseCasePageInstance, UseCasePageInstance, useCasePageSchemaName } from "typedb-web-schema";
import { FloatingDotsBackgroundComponent } from "../../framework/background/floating-dots-background.component";
import { HotTopicsComponent } from "../../framework/hot-topics/hot-topics.component";
import { PolyglotComparisonComponent } from "../../framework/polyglot-comparison/polyglot-comparison.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PageComponentBase } from "../page-component-base";
import { LinkPanelsComponent } from "src/framework/link-panels/link-panels.component";
import { portableTextToPlainText } from "src/service/portable-text-utils";

@Component({
    selector: "td-use-case-page",
    templateUrl: "./use-case-page.component.html",

    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        AsyncPipe, FloatingDotsBackgroundComponent, PolyglotComparisonComponent, SectionCoreComponent,
        HotTopicsComponent, LinkPanelsComponent
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

    protected override getMetaTagFallbacks(page: UseCasePageInstance) {
        const bodyText = portableTextToPlainText(page.introSection?.body);

        return {
            title: `TypeDB in ${page.title}`,
            description: bodyText || `Learn how TypeDB powers ${page.title} applications`,
        };
    }

    protected override onPageReady(page: UseCasePageInstance): void {
        super.onPageReady(page);
        this.title.setTitle(`TypeDB in ${page.title}`);
    }
}

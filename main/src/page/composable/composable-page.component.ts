import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { map } from "rxjs";
import { ComposablePage, composablePageSchemaName, SanityComposablePage, SanityDataset } from "typedb-web-schema";
import { FloatingDotsBackgroundComponent } from "../../framework/background/floating-dots-background.component";
import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { ContentPanelComponent } from "../../framework/content-panel/content-panel.component";
import { KeyPointPanels2x2Component } from "../../framework/key-point/key-point-panels-2x2.component";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { SimpleLinkPanelsComponent } from "../../framework/link-panels/simple/simple-link-panels.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { portableTextToPlainText } from "../../service/portable-text-utils";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-composable-page",
    templateUrl: "./composable-page.component.html",

    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        AsyncPipe, ConclusionPanelComponent, ContentPanelComponent, FloatingDotsBackgroundComponent,
        KeyPointPanels2x2Component, LinkPanelsComponent, SectionCoreComponent, SimpleLinkPanelsComponent,
    ],
})
export class ComposablePageComponent extends PageComponentBase<ComposablePage> {
    protected override getPage(db: SanityDataset) {
        return this.activatedRoute.paramMap.pipe(
            map((params) => {
                const pages = db.getDocumentsByType<SanityComposablePage>(composablePageSchemaName);
                const page = pages.find((x) => x.route.current === params.get("slug"));
                return page ? new ComposablePage(page, db) : null;
            }),
        );
    }

    protected override getMetaTagFallbacks(page: ComposablePage) {
        return {
            title: page.title,
            description: portableTextToPlainText(page.sections[0]?.section.body) || undefined,
        };
    }

    protected override onPageReady(page: ComposablePage): void {
        super.onPageReady(page);
        this.title.setTitle(page.title);
    }
}

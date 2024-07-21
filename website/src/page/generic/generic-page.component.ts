import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { map } from "rxjs";
import { GenericPage, SanityDataset, SanityGenericPage } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { ContentPanelComponent } from "../../framework/content-panel/content-panel.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/intro-section/title-body-actions-section.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-generic-page",
    templateUrl: "./generic-page.component.html",
    styleUrls: ["./generic-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, TitleBodyActionsSectionComponent, ContentPanelComponent,
        ConclusionPanelComponent, AsyncPipe
    ],
})
export class GenericPageComponent extends PageComponentBase<GenericPage> {
    protected override getPage(data: SanityDataset) {
        return this.activatedRoute.data.pipe(
            map((routeData) => {
                const page = data.getDocumentByID<SanityGenericPage>(routeData["documentID"]);
                return page ? new GenericPage(page, data) : null;
            }),
        );
    }

    get isCloudPage(): boolean {
        return this.router.url.includes("cloud");
    }
}

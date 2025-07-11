import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";
import { ResourceHub, SanityDataset, SanityResourceHub } from "typedb-web-schema";
import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { LinkPanelsCols2Component } from "../../framework/link-panels/link-panels.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { TitleBodyActionsSectionComponent } from "../../framework/section/title-body-actions-section.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-resource-hub",
    templateUrl: "./resource-hub.component.html",
    styleUrls: ["./resource-hub.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TitleBodyActionsSectionComponent, LinkPanelsCols2Component, ConclusionPanelComponent,
        AsyncPipe, SectionCoreComponent,
    ],
})
export class ResourceHubComponent extends PageComponentBase<ResourceHub> {
    protected override getPage(data: SanityDataset) {
        return this.activatedRoute.data.pipe(
            map((routeData) => {
                const page = data.getDocumentByID<SanityResourceHub>(routeData["documentID"]);
                return page ? new ResourceHub(page, data) : null;
            }),
        );
    }
}

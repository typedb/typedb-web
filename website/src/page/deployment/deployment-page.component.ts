import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { of } from "rxjs";
import { DeploymentPage, deploymentPageSchemaName, SanityDataset, SanityDeploymentPage } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureTableComponent } from "../../framework/feature-table/feature-table.component";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { ProductTableComponent } from "../../framework/product-table/product-table.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-deployment-page",
    templateUrl: "./deployment-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, ProductTableComponent, FeatureTableComponent,
        LinkPanelsComponent, ConclusionPanelComponent, AsyncPipe, SectionCoreComponent
    ],
})
export class DeploymentPageComponent extends PageComponentBase<DeploymentPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityDeploymentPage>(deploymentPageSchemaName);
        return of(page ? new DeploymentPage(page, data) : null);
    }
}

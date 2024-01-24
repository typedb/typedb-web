import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, Input } from "@angular/core";

import { of } from "rxjs";
import {
    DeploymentPage,
    deploymentPageSchemaName,
    SanityDataset,
    SanityDeploymentPage,
    TechnicolorBlock,
} from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureTableComponent } from "../../framework/feature-table/feature-table.component";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { ProductTableComponent } from "../../framework/product-table/product-table.component";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-deployment-page",
    templateUrl: "./deployment-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    PageBackgroundComponent,
    forwardRef(() => DeploymentPageTechnicolorBlockComponent),
    ProductTableComponent,
    FeatureTableComponent,
    LinkPanelsComponent,
    ConclusionPanelComponent,
    AsyncPipe
],
})
export class DeploymentPageComponent extends PageComponentBase<DeploymentPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityDeploymentPage>(deploymentPageSchemaName);
        return of(page ? new DeploymentPage(page, data) : null);
    }
}

@Component({
    selector: "td-deployment-page-technicolor-block",
    template: `<td-technicolor-block
        [block]="block"
        [index]="index"
        [level]="level"
        [noUpperLine]="index === 0"
    ></td-technicolor-block>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TechnicolorBlockComponent],
})
export class DeploymentPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;

    get level(): TechnicolorBlockComponent["level"] {
        return this.index === 0 ? "h1" : "h2";
    }
}

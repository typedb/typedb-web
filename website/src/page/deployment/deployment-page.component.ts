import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import { DeploymentPage, deploymentPageSchemaName, SanityDataset, SanityDeploymentPage, SectionBase } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { FeatureTableComponent } from "../../framework/feature-table/feature-table.component";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { ProductTableComponent } from "../../framework/product-table/product-table.component";
import { CoreSectionComponent } from "../../framework/section/core-section.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-deployment-page-core-section",
    template: `<td-core-section [section]="section" [index]="index" [level]="level" [noUpperLine]="index === 0"/>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CoreSectionComponent],
})
export class DeploymentPageCoreSectionComponent {
    @Input() section!: SectionBase;
    @Input() index!: number;

    get level(): CoreSectionComponent["level"] {
        return this.index === 0 ? "h1" : "h2";
    }
}

@Component({
    selector: "td-deployment-page",
    templateUrl: "./deployment-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, DeploymentPageCoreSectionComponent, ProductTableComponent, FeatureTableComponent,
        LinkPanelsComponent, ConclusionPanelComponent, AsyncPipe
    ],
})
export class DeploymentPageComponent extends PageComponentBase<DeploymentPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityDeploymentPage>(deploymentPageSchemaName);
        return of(page ? new DeploymentPage(page, data) : null);
    }
}

import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import {
    DeploymentPage,
    deploymentPageSchemaName,
    SanityDataset,
    SanityDeploymentPage,
    TechnicolorBlock,
} from "typedb-web-schema";

import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { StandardPageComponent } from "../standard-page.component";

@Component({
    selector: "td-deployment-page",
    templateUrl: "./deployment-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeploymentPageComponent extends StandardPageComponent<DeploymentPage> {
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
})
export class DeploymentPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;

    get level(): TechnicolorBlockComponent["level"] {
        return this.index === 0 ? "h1" : "h2";
    }
}

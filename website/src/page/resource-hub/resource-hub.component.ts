import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { map } from "rxjs";
import { ResourceHub, SanityDataset, SanityResourceHub } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { LinkPanelsCols2Component } from "../../framework/link-panels/link-panels.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/section/title-body-actions-section.component";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-resources-block",
    template: `<td-technicolor-block [block]="section" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TechnicolorBlockComponent]
})
export class ResourcesBlockComponent {
    @Input() section!: TechnicolorBlock;
    @Input() index!: number;
}

@Component({
    selector: "td-resource-hub",
    templateUrl: "./resource-hub.component.html",
    styleUrls: ["./resource-hub.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TitleBodyActionsSectionComponent, ResourcesBlockComponent,
        LinkPanelsCols2Component, ConclusionPanelComponent, AsyncPipe
    ]
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

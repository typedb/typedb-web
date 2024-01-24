import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from "@angular/core";

import { map } from "rxjs";
import {
    GenericPage,
    SanityDataset,
    SanityGenericPage,
    TechnicolorBlock,
    TitleBodyPanelSection,
} from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { ContentPanelComponent } from "../../framework/content-panel/content-panel.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/section/title-body-actions-section.component";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { FeaturesPageTechnicolorBlockComponent } from "../features/features-page.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-generic-page",
    templateUrl: "./generic-page.component.html",
    styleUrls: ["./generic-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    PageBackgroundComponent,
    TitleBodyActionsSectionComponent,
    forwardRef(() => GenericPageTechnicolorBlockComponent),
    ContentPanelComponent,
    FeaturesPageTechnicolorBlockComponent,
    ConclusionPanelComponent,
    AsyncPipe
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

@Component({
    selector: "td-generic-page-technicolor-block",
    template: `<td-technicolor-block [block]="block" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TechnicolorBlockComponent],
})
export class GenericPageTechnicolorBlockComponent implements OnInit {
    @Input() section!: TitleBodyPanelSection;
    @Input() index!: number;

    block!: TechnicolorBlock;

    ngOnInit() {
        this.block = new TechnicolorBlock(this.section);
    }
}

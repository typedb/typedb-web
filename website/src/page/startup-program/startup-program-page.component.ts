import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import { SanityDataset, SanityStartupProgramPage, StartupProgramPage, startupProgramPageSchemaName, TechnicolorBlock } from "typedb-web-schema";
import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";

import { ContactPanelComponent } from "../../framework/contact-panel/contact-panel.component";
import { ContentPanelComponent } from "../../framework/content-panel/content-panel.component";
import { FeatureTableComponent } from "../../framework/feature-table/feature-table.component";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { PricingTableComponent } from "../../framework/pricing-table/pricing-table.component";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { GenericPageTechnicolorBlockComponent } from "../generic/generic-page.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-startup-program-page-technicolor-block",
    template: `<td-technicolor-block [block]="block" [index]="index" [level]="level" [noUpperLine]="index === 0"/>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TechnicolorBlockComponent],
})
export class StartupProgramPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;

    get level(): TechnicolorBlockComponent["level"] {
        return this.index === 0 ? "h1" : "h2";
    }
}

@Component({
    selector: "td-startup-program-page",
    templateUrl: "./startup-program-page.component.html",
    styleUrls: ["./startup-program-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, StartupProgramPageTechnicolorBlockComponent,
        FeatureTableComponent, LinkPanelsComponent, AsyncPipe, PricingTableComponent, ContactPanelComponent,
        ContentPanelComponent, GenericPageTechnicolorBlockComponent, ConclusionPanelComponent,
    ],
})
export class StartupProgramPageComponent extends PageComponentBase<StartupProgramPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityStartupProgramPage>(startupProgramPageSchemaName);
        return of(page ? new StartupProgramPage(page, data) : null);
    }
}

import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import { PricingPage, pricingPageSchemaName, SanityDataset, SanityPricingPage, TechnicolorBlock } from "typedb-web-schema";

import { ContactPanelComponent } from "../../framework/contact-panel/contact-panel.component";
import { ContentPanelComponent } from "../../framework/content-panel/content-panel.component";
import { FeatureTableComponent } from "../../framework/feature-table/feature-table.component";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { PricingTableComponent } from "../../framework/pricing-table/pricing-table.component";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-pricing-page-technicolor-block",
    template: `<td-technicolor-block [block]="block" [index]="index" [level]="level" [noUpperLine]="index === 0"/>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TechnicolorBlockComponent]
})
export class PricingPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() index!: number;

    get level(): TechnicolorBlockComponent["level"] {
        return this.index === 0 ? "h1" : "h2";
    }
}

@Component({
    selector: "td-pricing-page",
    templateUrl: "./pricing-page.component.html",
    styleUrls: ["./pricing-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        PricingPageTechnicolorBlockComponent, FeatureTableComponent,
        AsyncPipe, PricingTableComponent, ContactPanelComponent, ContentPanelComponent,
    ]
})
export class PricingPageComponent extends PageComponentBase<PricingPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityPricingPage>(pricingPageSchemaName);
        return of(page ? new PricingPage(page, data) : null);
    }
}

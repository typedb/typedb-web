import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { of } from "rxjs";
import { PricingPage, pricingPageSchemaName, SanityDataset, SanityPricingPage } from "typedb-web-schema";
import { ContactPanelComponent } from "../../framework/contact-panel/contact-panel.component";
import { ContentPanelComponent } from "../../framework/content-panel/content-panel.component";
import { FeatureTableComponent } from "../../framework/feature-table/feature-table.component";
import { PricingTableComponent } from "../../framework/pricing-table/pricing-table.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-pricing-page",
    templateUrl: "./pricing-page.component.html",
    styleUrls: ["./pricing-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FeatureTableComponent, SectionCoreComponent,
        AsyncPipe, PricingTableComponent, ContactPanelComponent, ContentPanelComponent,
    ]
})
export class PricingPageComponent extends PageComponentBase<PricingPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityPricingPage>(pricingPageSchemaName);
        return of(page ? new PricingPage(page, data) : null);
    }
}

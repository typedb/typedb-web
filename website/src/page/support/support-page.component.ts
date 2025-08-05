import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { of } from "rxjs";
import { SanitySupportPage, SupportPage, supportPageSchemaName } from "typedb-web-schema";
import { SanityDataset } from "typedb-web-schema";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { ContactPanelComponent } from "../../framework/contact-panel/contact-panel.component";
import { FeatureTableComponent } from "../../framework/feature-table/feature-table.component";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { TestimonialsCarouselComponent } from "../../framework/testimonials-carousel/testimonials-carousel.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-support-page",
    templateUrl: "./support-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        LinkPanelsComponent, SectionCoreComponent,
        FeatureTableComponent, TestimonialsCarouselComponent, ContactPanelComponent, AsyncPipe
    ]
})
export class SupportPageComponent extends PageComponentBase<SupportPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanitySupportPage>(supportPageSchemaName);
        return of(page ? new SupportPage(page, data) : null);
    }
}

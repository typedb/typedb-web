import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { of } from "rxjs";
import { SanityDataset, SanityServicesPage, ServicesPage, servicesPageSchemaName } from "typedb-web-schema";
import { ContactPanelComponent } from "../../framework/contact-panel/contact-panel.component";
import { ServicesTableComponent } from "../../framework/services-table/services-table.component";
import { SectionCoreComponent } from "../../framework/section/section-core.component";
import { TestimonialsCarouselComponent } from "../../framework/testimonials-carousel/testimonials-carousel.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-services-page",
    templateUrl: "./services-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ServicesTableComponent, TestimonialsCarouselComponent, ContactPanelComponent, AsyncPipe,
        SectionCoreComponent
    ],
})
export class ServicesPageComponent extends PageComponentBase<ServicesPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityServicesPage>(servicesPageSchemaName);
        return of(page ? new ServicesPage(page, data) : null);
    }
}

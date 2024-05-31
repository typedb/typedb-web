import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import { SanityDataset, SanityServicesPage, ServicesPage, servicesPageSchemaName, SectionBase } from "typedb-web-schema";

import { ContactPanelComponent } from "../../framework/contact-panel/contact-panel.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { ServicesTableComponent } from "../../framework/services-table/services-table.component";
import { CoreSectionComponent } from "../../framework/section/core-section.component";
import { TestimonialsCarouselComponent } from "../../framework/testimonials-carousel/testimonials-carousel.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-services-page-core-section",
    template: `<td-core-section
        [section]="block"
        [index]="index"
        [level]="level"
        [noUpperLine]="index === 0"
        [longUpperLine]="block === page.contactSection"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CoreSectionComponent],
})
export class ServicesPageCoreSectionComponent {
    @Input() block!: SectionBase;
    @Input() page!: ServicesPage;

    get index(): number {
        return this.allBlocks.indexOf(this.block);
    }

    get level(): CoreSectionComponent["level"] {
        return this.block === this.page.introSection ? "h1" : "h2";
    }

    private get allBlocks(): SectionBase[] {
        const blocks: (SectionBase | undefined)[] = [
            this.page.introSection,
            this.page.testimonialsSection,
            this.page.contactSection,
        ];
        return blocks.filter((x): x is SectionBase => x instanceof SectionBase);
    }
}

@Component({
    selector: "td-services-page",
    templateUrl: "./services-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, ServicesPageCoreSectionComponent, ServicesTableComponent,
        TestimonialsCarouselComponent, ContactPanelComponent, AsyncPipe
    ],
})
export class ServicesPageComponent extends PageComponentBase<ServicesPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityServicesPage>(servicesPageSchemaName);
        return of(page ? new ServicesPage(page, data) : null);
    }
}

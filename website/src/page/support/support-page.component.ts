import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import { SanitySupportPage, SupportPage, supportPageSchemaName, SectionBase } from "typedb-web-schema";
import { SanityDataset } from "typedb-web-schema";

import { ContactPanelComponent } from "../../framework/contact-panel/contact-panel.component";
import { FeatureTableComponent } from "../../framework/feature-table/feature-table.component";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { CoreSectionComponent } from "../../framework/section/core-section.component";
import { TestimonialsCarouselComponent } from "../../framework/testimonials-carousel/testimonials-carousel.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-support-page-core-section",
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
export class SupportPageCoreSectionComponent {
    @Input() block!: SectionBase;
    @Input() page!: SupportPage;

    get index(): number {
        return this.allBlocks.indexOf(this.block);
    }

    get level(): CoreSectionComponent["level"] {
        return this.block === this.page.introSection ? "h1" : "h2";
    }

    private get allBlocks(): SectionBase[] {
        const blocks: (SectionBase | undefined)[] = [
            this.page.introSection,
            this.page.featureTableSection,
            this.page.testimonialsSection,
            this.page.contactSection,
        ];
        return blocks.filter((x): x is SectionBase => x instanceof SectionBase);
    }
}

@Component({
    selector: "td-support-page",
    templateUrl: "./support-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, SupportPageCoreSectionComponent, LinkPanelsComponent, FeatureTableComponent,
        TestimonialsCarouselComponent, ContactPanelComponent, AsyncPipe
    ],
})
export class SupportPageComponent extends PageComponentBase<SupportPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanitySupportPage>(supportPageSchemaName);
        return of(page ? new SupportPage(page, data) : null);
    }
}
import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, Input } from "@angular/core";

import { of } from "rxjs";
import { SanitySupportPage, SupportPage, supportPageSchemaName, TechnicolorBlock } from "typedb-web-schema";
import { SanityDataset } from "typedb-web-schema";

import { TechnicolorBlockComponent } from "src/framework/technicolor-block/technicolor-block.component";

import { ContactPanelComponent } from "../../framework/contact-panel/contact-panel.component";
import { FeatureTableComponent } from "../../framework/feature-table/feature-table.component";
import { LinkPanelsComponent } from "../../framework/link-panels/link-panels.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TechnicolorBlockComponent as TechnicolorBlockComponent_1 } from "../../framework/technicolor-block/technicolor-block.component";
import { TestimonialsCarouselComponent } from "../../framework/testimonials-carousel/testimonials-carousel.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-support-page",
    templateUrl: "./support-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent,
        NgIf,
        forwardRef(() => SupportPageTechnicolorBlockComponent),
        LinkPanelsComponent,
        FeatureTableComponent,
        TestimonialsCarouselComponent,
        ContactPanelComponent,
        AsyncPipe,
    ],
})
export class SupportPageComponent extends PageComponentBase<SupportPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanitySupportPage>(supportPageSchemaName);
        return of(page ? new SupportPage(page, data) : null);
    }
}

@Component({
    selector: "td-support-page-technicolor-block",
    template: `<td-technicolor-block
        [block]="block"
        [index]="index"
        [level]="level"
        [noUpperLine]="index === 0"
        [longUpperLine]="block === page.contactSection"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TechnicolorBlockComponent_1],
})
export class SupportPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: SupportPage;

    get index(): number {
        return this.allBlocks.indexOf(this.block);
    }

    get level(): TechnicolorBlockComponent["level"] {
        return this.block === this.page.introSection ? "h1" : "h2";
    }

    private get allBlocks(): TechnicolorBlock[] {
        const blocks: (TechnicolorBlock | undefined)[] = [
            this.page.introSection,
            this.page.featureTableSection,
            this.page.testimonialsSection,
            this.page.contactSection,
        ];
        return blocks.filter((x): x is TechnicolorBlock => x instanceof TechnicolorBlock);
    }
}

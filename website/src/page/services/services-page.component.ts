import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import {
    SanityDataset,
    SanityServicesPage,
    ServicesPage,
    servicesPageSchemaName,
    TechnicolorBlock,
} from "typedb-web-schema";

import { TechnicolorBlockComponent } from "src/framework/technicolor-block/technicolor-block.component";

import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-services-page",
    templateUrl: "./services-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPageComponent extends PageComponentBase<ServicesPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityServicesPage>(servicesPageSchemaName);
        return of(page ? new ServicesPage(page, data) : null);
    }
}

@Component({
    selector: "td-services-page-technicolor-block",
    template: `<td-technicolor-block
        [block]="block"
        [index]="index"
        [level]="level"
        [noUpperLine]="index === 0"
        [longUpperLine]="block === page.contactSection"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPageTechnicolorBlockComponent {
    @Input() block!: TechnicolorBlock;
    @Input() page!: ServicesPage;

    get index(): number {
        return this.allBlocks.indexOf(this.block);
    }

    get level(): TechnicolorBlockComponent["level"] {
        return this.block === this.page.introSection ? "h1" : "h2";
    }

    private get allBlocks(): TechnicolorBlock[] {
        const blocks: (TechnicolorBlock | undefined)[] = [
            this.page.introSection,
            this.page.testimonialsSection,
            this.page.contactSection,
        ];
        return blocks.filter((x): x is TechnicolorBlock => x instanceof TechnicolorBlock);
    }
}

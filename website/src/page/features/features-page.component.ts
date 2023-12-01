import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { of } from "rxjs";
import { FeaturesPage, featuresPageSchemaName, SanityDataset, SanityFeaturesPage } from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";

import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-features-page",
    templateUrl: "./features-page.component.html",
    styleUrls: ["./features-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesPageComponent extends PageComponentBase<FeaturesPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityFeaturesPage>(featuresPageSchemaName);
        return of(page ? new FeaturesPage(page, data) : null);
    }
}

@Component({
    selector: "td-features-page-technicolor-block",
    template: `<td-technicolor-block [block]="section" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesPageTechnicolorBlockComponent {
    @Input() section!: TechnicolorBlock;
    @Input() index!: number;
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";

import { of } from "rxjs";
import {
    ConclusionSection,
    PhilosophyPage,
    philosophyPageSchemaName,
    PublicationSection,
    SanityDataset,
    SanityPhilosophyPage,
} from "typedb-web-schema";
import { TechnicolorBlock } from "typedb-web-schema";

import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-philosophy-page",
    templateUrl: "./philosophy-page.component.html",
    styleUrls: ["./philosophy-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhilosophyPageComponent extends PageComponentBase<PhilosophyPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityPhilosophyPage>(philosophyPageSchemaName);
        return of(page ? new PhilosophyPage(page, data) : null);
    }
}

@Component({
    selector: "td-philosophy-page-technicolor-block",
    template: `<td-technicolor-block [block]="block" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhilosophyPageTechnicolorBlockComponent implements OnInit {
    @Input() section!: PublicationSection | ConclusionSection;
    @Input() index!: number;
    @Input() page!: PhilosophyPage;

    block!: TechnicolorBlock;

    ngOnInit() {
        this.block = new TechnicolorBlock(this.section);
    }
}

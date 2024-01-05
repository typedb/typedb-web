import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from "@angular/core";

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

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { PublicationPanelComponent } from "../../framework/publication-panel/publication-panel.component";
import { TitleBodyActionsSectionComponent } from "../../framework/section/title-body-actions-section.component";
import { TechnicolorBlockComponent } from "../../framework/technicolor-block/technicolor-block.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-philosophy-page",
    templateUrl: "./philosophy-page.component.html",
    styleUrls: ["./philosophy-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent,
        NgIf,
        TitleBodyActionsSectionComponent,
        NgFor,
        forwardRef(() => PhilosophyPageTechnicolorBlockComponent),
        PublicationPanelComponent,
        ConclusionPanelComponent,
        AsyncPipe,
    ],
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
    standalone: true,
    imports: [TechnicolorBlockComponent],
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

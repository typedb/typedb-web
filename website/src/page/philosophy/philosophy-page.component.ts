import { AsyncPipe } from "@angular/common";
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
import { SectionBase } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { PublicationPanelComponent } from "../../framework/publication-panel/publication-panel.component";
import { TitleBodyActionsSectionComponent } from "../../framework/./intro-section/title-body-actions-section.component";
import { CoreSectionComponent } from "../../framework/section/core-section.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-philosophy-page",
    templateUrl: "./philosophy-page.component.html",
    styleUrls: ["./philosophy-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    PageBackgroundComponent,
    TitleBodyActionsSectionComponent,
    forwardRef(() => PhilosophyPageCoreSectionComponent),
    PublicationPanelComponent,
    ConclusionPanelComponent,
    AsyncPipe
],
})
export class PhilosophyPageComponent extends PageComponentBase<PhilosophyPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityPhilosophyPage>(philosophyPageSchemaName);
        return of(page ? new PhilosophyPage(page, data) : null);
    }
}

@Component({
    selector: "td-philosophy-page-core-section",
    template: `<td-core-section [section]="block" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CoreSectionComponent],
})
export class PhilosophyPageCoreSectionComponent implements OnInit {
    @Input() section!: PublicationSection | ConclusionSection;
    @Input() index!: number;
    @Input() page!: PhilosophyPage;

    block!: SectionBase;

    ngOnInit() {
        this.block = new SectionBase(this.section);
    }
}

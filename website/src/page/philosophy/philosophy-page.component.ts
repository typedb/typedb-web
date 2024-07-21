import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { of } from "rxjs";
import {
    PhilosophyPage,
    philosophyPageSchemaName,
    SanityDataset,
    SanityPhilosophyPage,
} from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { TitleBodyActionsSectionComponent } from "../../framework/intro-section/title-body-actions-section.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { PublicationPanelComponent } from "../../framework/publication-panel/publication-panel.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-philosophy-page",
    templateUrl: "./philosophy-page.component.html",
    styleUrls: ["./philosophy-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, TitleBodyActionsSectionComponent, PublicationPanelComponent, ConclusionPanelComponent,
        AsyncPipe
    ],
})
export class PhilosophyPageComponent extends PageComponentBase<PhilosophyPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityPhilosophyPage>(philosophyPageSchemaName);
        return of(page ? new PhilosophyPage(page, data) : null);
    }
}

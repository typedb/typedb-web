import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";

import { map } from "rxjs";
import { GenericPage, SanityDataset, SanityGenericPage, SectionBase, TitleBodyPanelSection } from "typedb-web-schema";

import { ConclusionPanelComponent } from "../../framework/conclusion-panel/conclusion-panel.component";
import { ContentPanelComponent } from "../../framework/content-panel/content-panel.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/intro-section/title-body-actions-section.component";
import { CoreSectionComponent } from "../../framework/section/core-section.component";
import { FeaturesPageCoreSectionComponent } from "../features/features-page.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-generic-page-core-section",
    template: `<td-core-section [section]="block" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CoreSectionComponent],
})
export class GenericPageCoreSectionComponent implements OnInit {
    @Input() section!: TitleBodyPanelSection;
    @Input() index!: number;

    block!: SectionBase;

    ngOnInit() {
        this.block = new SectionBase(this.section);
    }
}

@Component({
    selector: "td-generic-page",
    templateUrl: "./generic-page.component.html",
    styleUrls: ["./generic-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent, TitleBodyActionsSectionComponent, GenericPageCoreSectionComponent,
        ContentPanelComponent, FeaturesPageCoreSectionComponent, ConclusionPanelComponent, AsyncPipe
    ],
})
export class GenericPageComponent extends PageComponentBase<GenericPage> {
    protected override getPage(data: SanityDataset) {
        return this.activatedRoute.data.pipe(
            map((routeData) => {
                const page = data.getDocumentByID<SanityGenericPage>(routeData["documentID"]);
                return page ? new GenericPage(page, data) : null;
            }),
        );
    }

    get isCloudPage(): boolean {
        return this.router.url.includes("cloud");
    }
}

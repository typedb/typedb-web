import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";

import { map } from "rxjs";
import {
    GenericPage,
    SanityDataset,
    SanityGenericPage,
    TechnicolorBlock,
    TitleBodyPanelSection,
} from "typedb-web-schema";

import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-generic-page",
    templateUrl: "./generic-page.component.html",
    styleUrls: ["./generic-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
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

@Component({
    selector: "td-generic-page-technicolor-block",
    template: `<td-technicolor-block [block]="block" [index]="index + 1" [noUpperLine]="index === 0" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericPageTechnicolorBlockComponent implements OnInit {
    @Input() section!: TitleBodyPanelSection;
    @Input() index!: number;

    block!: TechnicolorBlock;

    ngOnInit() {
        this.block = new TechnicolorBlock(this.section);
    }
}

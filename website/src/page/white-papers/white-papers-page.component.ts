import { ChangeDetectionStrategy, Component } from "@angular/core";

import { of } from "rxjs";
import {
    ButtonStyle,
    LinkButton,
    SanityDataset,
    SanityWhitePapersPage,
    WhitePaper,
    WhitePapersPage,
    whitePapersPageSchemaName,
} from "typedb-web-schema";

import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-white-papers-page",
    templateUrl: "./white-papers-page.component.html",
    styleUrls: ["./white-papers-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhitePapersPageComponent extends PageComponentBase<WhitePapersPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityWhitePapersPage>(whitePapersPageSchemaName);
        return of(page ? new WhitePapersPage(page, data) : null);
    }

    accessResourceButton(whitePaper: WhitePaper, style: ButtonStyle, text: string): LinkButton {
        return new LinkButton({
            style: style,
            text: text,
            link: whitePaper.detailsPageLink(),
            comingSoon: false,
        });
    }
}

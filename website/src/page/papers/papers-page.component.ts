import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { of } from "rxjs";
import { sanitiseHtmlID } from "typedb-web-common/lib";
import {
    ButtonStyle,
    LinkButton,
    SanityDataset,
    SanityPapersPage,
    Paper,
    PapersPage,
    papersPageSchemaName,
} from "typedb-web-schema";

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../../framework/button/button.component";
import { TitleBodyActionsSectionComponent } from "../../framework/section/title-body-actions-section.component";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-papers-page",
    templateUrl: "./papers-page.component.html",
    styleUrls: ["./papers-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TitleBodyActionsSectionComponent, AspectRatioComponent, RichTextComponent,
        ButtonComponent, AsyncPipe, PlainTextPipe,
    ]
})
export class PapersPageComponent extends PageComponentBase<PapersPage> {
    protected override getPage(data: SanityDataset) {
        const page = data.getDocumentByID<SanityPapersPage>(papersPageSchemaName);
        return of(page ? new PapersPage(page, data) : null);
    }

    accessResourceButton(paper: Paper, style: ButtonStyle, text: string): LinkButton {
        return new LinkButton({
            style: style,
            text: text,
            link: paper.detailsPageLink(),
            comingSoon: false,
        });
    }

    downloadButtonId(paper: Paper): string {
        return sanitiseHtmlID(`${paper.title.toSectionID()}_download`);
    }
}

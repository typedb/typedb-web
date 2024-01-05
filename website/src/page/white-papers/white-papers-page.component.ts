import { AsyncPipe, NgFor, NgIf } from "@angular/common";
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

import { AspectRatioComponent } from "../../framework/aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "../../framework/button/button.component";
import { PageBackgroundComponent } from "../../framework/page-background/page-background.component";
import { TitleBodyActionsSectionComponent } from "../../framework/section/title-body-actions-section.component";
import { PlainTextPipe } from "../../framework/text/plain-text.pipe";
import { RichTextComponent } from "../../framework/text/rich-text.component";
import { PageComponentBase } from "../page-component-base";

@Component({
    selector: "td-white-papers-page",
    templateUrl: "./white-papers-page.component.html",
    styleUrls: ["./white-papers-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PageBackgroundComponent,
        NgIf,
        TitleBodyActionsSectionComponent,
        AspectRatioComponent,
        RichTextComponent,
        ButtonComponent,
        NgFor,
        AsyncPipe,
        PlainTextPipe,
    ],
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

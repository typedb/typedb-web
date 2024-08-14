import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ProductPanel } from "typedb-web-schema";

import { ButtonComponent } from "../button/button.component";
import { RichTextComponent } from "../text/rich-text.component";
import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-product-table",
    templateUrl: "./product-table.component.html",
    styleUrls: ["./product-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RichTextComponent, ButtonComponent],
})
export class ProductTableComponent {
    @Input() panels!: ProductPanel[];
    @Input({ required: true }) sectionId!: string;

    linkId(panel: ProductPanel): string {
        return sanitiseHtmlID(`${this.sectionId}_${panel.title}_${panel.button.text}`);
    }
}

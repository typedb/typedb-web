import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ProductPanel } from "typedb-web-schema";

import { ButtonComponent } from "../button/button.component";
import { RichTextComponent } from "../text/rich-text.component";

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
}

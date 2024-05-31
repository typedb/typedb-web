import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ProductLabel } from "typedb-web-schema";

import { LinkDirective } from "../link/link.directive";
import { RichTextComponent } from "../text/rich-text.component";

@Component({
    selector: "td-product-label",
    templateUrl: "product-label.component.html",
    styleUrls: ["product-label.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RichTextComponent, LinkDirective],
})
export class ProductLabelComponent {
    @Input() product!: ProductLabel;
}

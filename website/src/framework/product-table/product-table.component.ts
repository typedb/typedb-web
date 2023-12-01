import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { ProductPanel } from "typedb-web-schema";

@Component({
    selector: "td-product-table",
    templateUrl: "./product-table.component.html",
    styleUrls: ["./product-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {
    @Input() panels!: ProductPanel[];
}

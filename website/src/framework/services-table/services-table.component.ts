import { Component, Input } from "@angular/core";
import { ServicesKeyPoint } from "typedb-web-schema";

@Component({
    selector: "td-services-table",
    templateUrl: "services-table.component.html",
    styleUrls: ["./services-table.component.scss"],
})
export class ServicesTableComponent {
    @Input() keyPoints!: ServicesKeyPoint[];
}

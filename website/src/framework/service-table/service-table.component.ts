import { Component, Input } from "@angular/core";
import { ServiceKeyPoint } from "typedb-web-schema";

@Component({
    selector: "td-service-table",
    templateUrl: "service-table.component.html",
    styleUrls: ["./service-table.component.scss"],
})
export class ServiceTableComponent {
    @Input() keyPoints!: ServiceKeyPoint[];
}

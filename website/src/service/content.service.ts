import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { associateBy, groupBy, SanityDataset } from "typedb-web-schema";
import { ContentEndpointService } from "./content-endpoint.service";

@Injectable({
    providedIn: "root",
})
export class ContentService {
    public data = new ReplaySubject<SanityDataset>();

    constructor(private http: HttpClient, private endpoint: ContentEndpointService) {
        this.endpoint.getContent().subscribe(data => {
            this.data.next(new SanityDataset({
                byType: groupBy(data.result, x => x._type),
                byId: associateBy(data.result, x => x._id),
            }));
        });
    }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { SanityDataset } from "typedb-web-schema";
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

function groupBy<T>(arr: T[], key: (i: T) => string) {
    return arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
    }, {} as { [key: string]: T[] });
}

function associateBy<T>(arr: T[], key: (i: T) => string) {
    return arr.reduce((items, item) => {
        if (items[key(item)]) { throw `Duplicate key: ${key(item)}`; }
        items[key(item)] = item;
        return items;
    }, {} as { [key: string]: T })
}

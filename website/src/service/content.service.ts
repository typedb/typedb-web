import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { RawDataset } from "../model/content";
import { ContentEndpointService } from "./content-endpoint.service";

const GET_ALL_DATA_QUERY = "*[!(_id in path('drafts.**')) && !(_type match 'system.**')]";

@Injectable({
    providedIn: "root",
})
export class ContentService {
    public data = new ReplaySubject<RawDataset>();

    constructor(private http: HttpClient, private endpoint: ContentEndpointService) {
        this.endpoint.query(GET_ALL_DATA_QUERY).subscribe(data => {
            this.data.next(new RawDataset({
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

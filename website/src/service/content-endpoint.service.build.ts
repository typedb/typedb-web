import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RawDocument } from "../model/content";

/**
 * @see content-endpoint.service.ts
 */
@Injectable({
    providedIn: "root",
})
export class ContentEndpointService {
    constructor(private http: HttpClient) {}

    query(query: string) {
        throw "Not implemented";
    }
}

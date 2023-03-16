import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SanityDocument } from "@sanity/types";

const SERVER_URL = "/api/content";

/**
 * @see content-endpoint.service.ts
 */
@Injectable({
    providedIn: "root",
})
export class ContentEndpointService {
    constructor(private http: HttpClient) {}

    getContent() {
        return this.http.get<{ result: SanityDocument[] }>(SERVER_URL);
    }
}

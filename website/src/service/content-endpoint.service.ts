import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SanityDocument } from "@sanity/types";

const SERVER_URL = "http://localhost:8080/api/content";

/**
 * When running `ng build` (e.g. in production), this file is replaced with `content-endpoint.service.build.ts`.
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

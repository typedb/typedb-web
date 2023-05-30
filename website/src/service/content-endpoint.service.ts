import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SanityDocument } from "@sanity/types";

const SANITY_URL = "https://xndl14mc.api.sanity.io/";
const SANITY_QUERY_STRING = "*[!(_type match 'system.**')]";
const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production?query=${SANITY_QUERY_STRING}`;

/**
 * When running `ng build` (e.g. in production), this file is replaced with `content-endpoint.service.prod.ts`.
 */
@Injectable({
    providedIn: "root",
})
export class ContentEndpointService {
    constructor(private http: HttpClient) {}

    getContent() {
        return this.http.get<{ result: SanityDocument[] }>(SANITY_QUERY_URL);
    }
}

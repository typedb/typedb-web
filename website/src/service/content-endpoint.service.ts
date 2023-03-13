import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RawDocument } from "../model/content";
import { SANITY_TOKEN } from "./credentials/token";

const SANITY_PROJECT_ID = "xndl14mc";
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/production`;

/**
 * During local development we bypass the need to spin up a TypeDB Web server by loading content
 * directly from Sanity.
 *
 * In order to use this functionality, create a file named `credentials/token.ts` with the following content, replacing
 * the templated variables with actual values. You will need to generate an API token in Sanity, preferably with read-only access.
 *
 * ```
 * export const SANITY_TOKEN = "{YOUR_SANITY_ACCESS_TOKEN}";
 * ```
 *
 * This is not required when running `ng build` (e.g. in production), as this file is replaced with `content-endpoint.service.build.ts`.
 */
@Injectable({
    providedIn: "root",
})
export class ContentEndpointService {
    constructor(private http: HttpClient) {}

    query(query: string) {
        return this.http.get<{ result: RawDocument[] }>(SANITY_URL, {
            headers: { "Authorization": `Bearer ${SANITY_TOKEN}` },
            params: { "query": query }
        });
    }
}

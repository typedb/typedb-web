import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SanityDocument } from "@sanity/types";

const SANITY_URL = "https://xndl14mc.api.sanity.io/";
const SANITY_QUERY_STRING = "*[!(_type match 'system.**')]";
const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production?query=${SANITY_QUERY_STRING}`;
// Read-only API token that must be provided to read draft content
const SANITY_TOKEN =
    "skIRNgnaiMLWn9XUwl20yvPaUODDE4P6kNWiRicQEthG2J4wvcCA1vRaCkTC9y4SChNzoq8BAw2vRuDEKvXRayMbVgUFsuER7otBti0zDzDk6mrEPze4oDfEPYyiw9eklL352jwFXVELvHNESrvkRiAm5IDxECjN3aYM3JjNH7bWbp5czrw3";

/**
 * When building the 'staging' configuration, this file is replaced with `content-endpoint.service.staging.ts`.
 * When building the 'production' configuration, this file is replaced with `content-endpoint.service.prod.ts`.
 */
@Injectable({
    providedIn: "root",
})
export class ContentEndpointService {
    constructor(private http: HttpClient) {}

    getContent() {
        return this.http.get<{ result: SanityDocument[] }>(SANITY_QUERY_URL, {
            headers: {
                Authorization: `Bearer ${SANITY_TOKEN}`,
            },
        });
    }
}

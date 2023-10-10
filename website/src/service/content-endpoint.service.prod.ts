import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { SanityDocument } from "@sanity/types";
import { TransferStateService } from "@scullyio/ng-lib";
import { first } from "rxjs/operators";

const SANITY_URL = "https://xndl14mc.api.sanity.io/";
const SANITY_QUERY_STRING = "*[!(_id in path('drafts.**')) %26%26 !(_type match 'system.**')]";
const SANITY_QUERY_URL = `${SANITY_URL}/v2021-10-21/data/query/production?query=${SANITY_QUERY_STRING}`;

/**
 * @see content-endpoint.service.ts
 */
@Injectable({
    providedIn: "root",
})
export class ContentEndpointService {
    constructor(
        private http: HttpClient,
        private transferState: TransferStateService,
    ) {}

    getContent() {
        return this.transferState
            .useScullyTransferState("content", this.http.get<{ result: SanityDocument[] }>(SANITY_QUERY_URL))
            .pipe(first());
    }
}

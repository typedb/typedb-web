import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { SanityDocument } from "@sanity/types";
import { TransferStateService } from "@scullyio/ng-lib";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SANITY_QUERY_URL, SANITY_TOKEN, TopbarData, topbarQuery } from "typedb-web-common/lib";

import { environment } from "src/environment/environment";

@Injectable({
    providedIn: "root",
})
export class ContentEndpointService {
    constructor(
        private http: HttpClient,
        private transferState: TransferStateService,
    ) {}

    getContent() {
        return this.getSanityResult<SanityDocument[]>("*[!(_type match 'system.**')]", "content");
    }

    getTopbarContent() {
        return this.getSanityResult<TopbarData>(topbarQuery, "topbarContent");
    }

    private getSanityResult<T>(query: string, name: string): Observable<T> {
        return this.transferState
            .useScullyTransferState(
                name,
                this.http.get<{ result: T }>(
                    SANITY_QUERY_URL,
                    environment.production
                        ? {
                              params: { query, perspective: "published" },
                          }
                        : {
                              params: { query, perspective: "previewDrafts" },
                              headers: { Authorization: `Bearer ${SANITY_TOKEN}` },
                          },
                ),
            )
            .pipe(map(({ result }) => result));
    }
}

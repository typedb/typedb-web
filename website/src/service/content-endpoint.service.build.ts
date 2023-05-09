import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SanityDocument } from "@sanity/types";
import { TransferStateService } from "@scullyio/ng-lib";

const SERVER_URL = "http://localhost/api/content";

/**
 * @see content-endpoint.service.ts
 */
@Injectable({
    providedIn: "root",
})
export class ContentEndpointService {
    constructor(private http: HttpClient, private transferState: TransferStateService) {}

    getContent() {
        return this.transferState.useScullyTransferState(
            "content",
            this.http.get<{ result: SanityDocument[] }>(SERVER_URL)
        );
    }
}

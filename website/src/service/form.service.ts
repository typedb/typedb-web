import { Injectable } from "@angular/core";

import { map, Observable, of, ReplaySubject, shareReplay } from "rxjs";
import { formsSchemaName, SanityCustomerIoForms } from "typedb-web-schema";
import { AnalyticsService } from "./analytics.service";

import { ContentService } from "./content.service";
import { isScullyRunning } from "@scullyio/ng-lib";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class FormService {
    readonly forms = new ReplaySubject<SanityCustomerIoForms>();

    constructor(
        contentService: ContentService, private http: HttpClient, private analytics: AnalyticsService,
    ) {
        contentService.data
            .pipe(
                map((data) => data.getDocumentByID(formsSchemaName) as SanityCustomerIoForms),
                shareReplay(1),
            )
            .subscribe((data) => {
                this.forms.next(data);
            });
    }

    submit(formId: string, data: { email: string } & Record<string, unknown>): Observable<unknown> {
        if (isScullyRunning()) return of(null);
        const props = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null && v.toString().trim().length));
        this.analytics.posthog.alias(data.email);
        this.analytics.posthog.set(props);
        this.analytics.cio.identify(data.email, props);
        return this.http.post(`https://typedb.com/forms/${formId}/submit`, { data }, {
            headers: {
                "Authorization": `Basic ZTVjMDIzODRiNTk1ZTUzYzYyNWY6ZDcyYmI5ZmRlMDQyZTY5MWE4MzE=`,
                "Content-Type": "application/json",
            },
        });
    }
}

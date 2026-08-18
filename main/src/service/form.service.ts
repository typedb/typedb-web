import { isPlatformServer } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";

import { map, Observable, of, ReplaySubject, shareReplay } from "rxjs";
import { formsSchemaName, SanityCustomerIoForms } from "typedb-web-schema";
import { environment } from "../environment/environment";
import { AnalyticsService } from "./analytics.service";

import { ContentService } from "./content.service";
import { HttpClient } from "@angular/common/http";

// Basic auth for the Customer.io track API (base64 "site_id:api_key" of the prod/dev workspace).
// These ship in the browser bundle by design - they are the same credentials the CDP snippet uses.
const authToken = environment.env === "production"
    ? `MmY2YjZmNWM1ZWYyOTNhY2ZiZjA6MzQ3NTUwNjZiOGZmYjlmYjdhNTY=`
    : `ZTVjMDIzODRiNTk1ZTUzYzYyNWY6ZDcyYmI5ZmRlMDQyZTY5MWE4MzE=`;

@Injectable({
    providedIn: "root",
})
export class FormService {
    readonly forms = new ReplaySubject<SanityCustomerIoForms>();
    private readonly platformId = inject(PLATFORM_ID);

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

    /**
     * Submits to the Customer.io Forms API. The typedb.com/forms/* path is a Netlify redirect
     * (see netlify.toml) to track.customer.io/api/v1/forms/* - it is not a first-party endpoint.
     * Form IDs come from the "Forms" singleton in Sanity; field names must match the form's
     * fields as configured in Customer.io. Also identifies the submitter in Customer.io and PostHog.
     */
    submit(formId: string, data: { email: string } & Record<string, unknown>): Observable<unknown> {
        if (isPlatformServer(this.platformId)) return of(null);
        const props = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null && v.toString().trim().length).map(([k, v]) => [k, v!.toString()]));
        this.analytics.posthog.identify(data.email, props);
        this.analytics.cio.identify(data.email, props);
        return this.http.post(`https://typedb.com/forms/${formId}/submit`, { data: props }, {
            headers: {
                "Authorization": `Basic ${authToken}`,
                "Content-Type": "application/json",
            },
        });
    }
}

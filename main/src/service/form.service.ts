import { isPlatformServer } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";

import { map, Observable, of, ReplaySubject, shareReplay } from "rxjs";
import { formsSchemaName, SanityCustomerIoForms } from "typedb-web-schema";
import { environment } from "../environment/environment";
import { AnalyticsService } from "./analytics.service";

import { ContentService } from "./content.service";
import { HttpClient } from "@angular/common/http";

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
     * Submits to the Customer.io Forms API through our relay (netlify/edge-functions/form-submit),
     * which holds the Customer.io credential. Form IDs come from the "Forms" singleton in Sanity; field names must match the form's
     * fields as configured in Customer.io. Also identifies the submitter in Customer.io and PostHog.
     */
    submit(formId: string, data: { email: string } & Record<string, unknown>): Observable<unknown> {
        if (isPlatformServer(this.platformId)) return of(null);
        const fields = { ...data, page_url: window.location.href.split("?")[0] };
        const props = Object.fromEntries(Object.entries(fields).filter(([_, v]) => v != null && v.toString().trim().length).map(([k, v]) => [k, v!.toString()]));
        this.analytics.posthog.identify(data.email, props);
        this.analytics.cio.identify(data.email, props);
        return this.http.post(`${environment.formsUrl}/${formId}/submit`, { data: props });
    }
}

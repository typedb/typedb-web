import { Injectable } from "@angular/core";

declare global {
    interface Window {
        _hsq: any[];
    }
}

export const HUBSPOT_PORTAL_ID = "4332244";
export const HUBSPOT_REGION = "na1";

/**
 * When building the 'production' configuration, this file is replaced with `analytics.service.prod.ts`.
 */
@Injectable({
    providedIn: "root",
})
export class AnalyticsService {
    hubspot = {
        trackPageView: () => {
            /* Page views are only tracked in production. */
        },
    };
}

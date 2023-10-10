import { Injectable } from "@angular/core";

export const HUBSPOT_PORTAL_ID = "4332244";
export const HUBSPOT_REGION = "na1";

/**
 * When building the 'production' configuration, this file is replaced with `analytics.service.prod.ts`.
 */
@Injectable({
    providedIn: "root",
})
export class AnalyticsService {
    /* Analytics scripts only run in production. */
    hubspot = {
        trackPageView: () => null,
    };
    googleAnalytics = {
        loadScriptTag: () => null,
    };
    googleTagManager = {
        loadScriptTag: () => null,
    };
}

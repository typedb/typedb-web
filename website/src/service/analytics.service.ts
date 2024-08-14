import { Injectable } from "@angular/core";

import { googleAdsConversionIds } from "./marketing-tech-constants";
import posthog from "posthog-js";

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
    posthog = {
        // capturePageView: () => null,
        capturePageView: () => {
            posthog.capture("$pageview");
        }
    };
    google = {
        loadScriptTag: () => null,
        reportAdConversion: (_event: keyof typeof googleAdsConversionIds) => null,
    };
    googleTagManager = {
        loadScriptTag: () => null,
    };
}

import { Injectable } from "@angular/core";

import { googleAdsConversionIds } from "./marketing-tech-constants";
import posthog, { Properties } from "posthog-js";

/**
 * When building the 'production' configuration, this file is replaced with `analytics.service.prod.ts`.
 */
@Injectable({
    providedIn: "root",
})
export class AnalyticsService {
    /* GA analytics scripts only run in production. */
    posthog = {
        alias: (newId: string, existingId?: string) => {
            posthog.alias(newId, existingId);
        },
        capturePageView: () => {
            posthog.capture("$pageview");
        },
        captureFormSubmission: (formId: string, submission: Record<string, unknown>) => {
            if (submission["email"]) {
                posthog.alias(submission["email"] as string);
            }
            const props = Object.fromEntries(Object.entries(submission).filter(([_, v]) => v != null));
            posthog.capture("form_submit", { form_id: formId, ...props }, { $set: props });
        },
        reset: () => {
            posthog.reset();
        },
        set: (userPropertiesToSet: Properties) => {
            posthog.setPersonProperties(userPropertiesToSet);
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

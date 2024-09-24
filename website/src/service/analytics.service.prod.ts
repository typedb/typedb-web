import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { isScullyRunning } from "@scullyio/ng-lib";
import { GOOGLE_TAG_ID, googleAdsConversionIds, GTM_ID } from "./marketing-tech-constants";
import posthog, { Properties } from "posthog-js";

@Injectable({
    providedIn: "root",
})
export class AnalyticsService {
    posthog = {
        alias: (newId: string, existingId?: string) => {
            if (isScullyRunning()) return;
            posthog.alias(newId, existingId);
        },
        capturePageView: () => {
            if (isScullyRunning()) return;
            posthog.capture("$pageview");
        },
        captureFormSubmission: (formId: string, submission: { email: string; } & Record<string, string>) => {
            if (isScullyRunning()) return;
            posthog.alias(submission.email);
            posthog.capture("form_submit", { form_id: formId, ...submission }, { $set: submission });
        },
        reset: () => {
            if (isScullyRunning()) return;
            posthog.reset();
        },
        set: (userPropertiesToSet: Properties) => {
            if (isScullyRunning()) return;
            posthog.setPersonProperties(userPropertiesToSet);
        }
    }
    google = {
        loadScriptTag: () => {
            if (isScullyRunning()) return;

            const scriptEl = document.createElement("script");
            scriptEl.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
            const scriptEl2 = document.createElement("script");
            scriptEl2.innerHTML = `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GOOGLE_TAG_ID}');`;
            document.head.appendChild(scriptEl);
            document.head.appendChild(scriptEl2);
        },
        reportAdConversion: (event: keyof typeof googleAdsConversionIds) => {
            window.gtag("event", "conversion", { send_to: googleAdsConversionIds[event] });
        },
    };
    googleTagManager = {
        loadScriptTag: () => {
            if (isScullyRunning()) return;

            const scriptEl = document.createElement("script");
            scriptEl.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');`;
            document.head.appendChild(scriptEl);
        },
    };

    constructor(private _router: Router) {}
}

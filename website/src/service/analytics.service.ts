import { Injectable } from "@angular/core";
import { isScullyRunning } from "@scullyio/ng-lib";
import { environment } from "../environment/environment";
import { GOOGLE_TAG_ID, googleAdsConversionIds, GTM_ID } from "./marketing-tech-constants";
import posthog, { Properties } from "posthog-js";
import { AnalyticsBrowser } from "@customerio/cdp-analytics-browser";

@Injectable({
    providedIn: "root",
})
export class AnalyticsService {
    private _cio = AnalyticsBrowser.load({
        writeKey: environment.env === "production" ? "13252ebf8d339959b5b9" : "5fed4032be64c59cf336",
        cdnURL: "https://typedb.com/platform",
    }, {
        integrations: {
            "Customer.io Data Pipelines": {
                apiHost: "typedb.com/platform/v1",
                protocol: "https",
            },
        },
    });

    // Google Ads and Google Analytics scripts only run in production
    posthog = {
        alias: (alias: string, original?: string) => {
            if (isScullyRunning()) return;
            posthog.alias(alias, original);
        },
        capturePageView: () => {
            if (isScullyRunning()) return;
            posthog.capture("$pageview");
        },
        getDistinctId: () => posthog.get_distinct_id(),
        identify: (id: string) => {
            if (isScullyRunning()) return;
            posthog.identify(id);
        },
        isIdentified: () => posthog._isIdentified(),
        mergeDangerously: (alias: string) => {
            if (isScullyRunning()) return;
            posthog.capture("$merge_dangerously", { alias });
        },
        reset: () => {
            if (isScullyRunning()) return;
            posthog.reset();
        },
        set: (userPropertiesToSet: Properties) => {
            if (isScullyRunning()) return;
            posthog.setPersonProperties(userPropertiesToSet);
        },
    };

    cio = {
        identify: (id: string, traits?: object) => {
            if (isScullyRunning()) return;
            this._cio.identify(id, traits);
        },
        page: () => {
            if (isScullyRunning()) return;
            this._cio.page();
        },
        reset: () => {
            if (isScullyRunning()) return;
            this._cio.reset();
        },
    };

    google = {
        loadScriptTag: () => {
            if (environment.env !== "production" || isScullyRunning()) return;

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
            if (environment.env !== "production" || isScullyRunning()) return;

            window.gtag("event", "conversion", { send_to: googleAdsConversionIds[event] });
        },
    };

    googleTagManager = {
        loadScriptTag: () => {
            if (environment.env !== "production" || isScullyRunning()) return;

            const scriptEl = document.createElement("script");
            scriptEl.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');`;
            document.head.appendChild(scriptEl);
        },
    };

    constructor() {}
}

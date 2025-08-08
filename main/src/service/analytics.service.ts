import { isPlatformServer } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { environment } from "../environment/environment";
import { GOOGLE_TAG_ID, googleAdsConversionIds, GTM_ID } from "./marketing-tech-constants";
import posthog, { Properties } from "posthog-js/dist/module.no-external";
import { AnalyticsBrowser } from "@customerio/cdp-analytics-browser";

@Injectable({
    providedIn: "root",
})
export class AnalyticsService {
    private readonly platformId = inject(PLATFORM_ID);
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
            if (isPlatformServer(this.platformId)) return;
            posthog.alias(alias, original);
        },
        capturePageView: () => {
            if (isPlatformServer(this.platformId)) return;
            posthog.capture("$pageview");
        },
        getDistinctId: () => posthog.get_distinct_id(),
        identify: (id: string, userPropertiesToSet?: Properties) => {
            if (isPlatformServer(this.platformId)) return;
            posthog.identify(id, userPropertiesToSet);
        },
        isIdentified: () => posthog._isIdentified(),
        mergeDangerously: (alias: string) => {
            if (isPlatformServer(this.platformId)) return;
            posthog.capture("$merge_dangerously", { alias });
        },
        reset: () => {
            if (isPlatformServer(this.platformId)) return;
            posthog.reset();
        },
        set: (userPropertiesToSet: Properties) => {
            if (isPlatformServer(this.platformId)) return;
            posthog.setPersonProperties(userPropertiesToSet);
        },
    };

    cio = {
        identify: (id: string, traits?: object) => {
            if (isPlatformServer(this.platformId)) return;
            this._cio.identify(id, traits);
        },
        page: () => {
            if (isPlatformServer(this.platformId)) return;
            this._cio.page();
        },
        reset: () => {
            if (isPlatformServer(this.platformId)) return;
            this._cio.reset();
        },
    };

    google = {
        loadScriptTag: () => {
            if (environment.env !== "production" || isPlatformServer(this.platformId)) return;

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
            if (environment.env !== "production" || isPlatformServer(this.platformId)) return;

            window.gtag("event", "conversion", { send_to: googleAdsConversionIds[event] });
        },
    };

    googleTagManager = {
        loadScriptTag: () => {
            if (environment.env !== "production" || isPlatformServer(this.platformId)) return;

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

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { isScullyRunning } from "@scullyio/ng-lib";
import { GOOGLE_TAG_ID, googleAdsConversionIds, GTM_ID, HUBSPOT_PORTAL_ID } from "./marketing-tech-constants";
import posthog from "posthog-js";

@Injectable({
    providedIn: "root",
})
export class AnalyticsService {
    private _hubspotTrackingCodeLoaded = false;
    hubspot = {
        trackPageView: () => {
            if (isScullyRunning()) return;
            // HubSpot tracking code
            const _hsq = (window._hsq = window._hsq || []);
            _hsq.push(["setPath", this._router.url]);
            if (this._hubspotTrackingCodeLoaded) {
                _hsq.push(["trackPageView"]);
            } else {
                const scriptEl = document.createElement("script");
                scriptEl.src = `//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;
                document.head.appendChild(scriptEl);
                this._hubspotTrackingCodeLoaded = true;
            }
        },
    };
    posthog = {
        capturePageView: () => {
            if (isScullyRunning()) return;
            posthog.capture("$pageview");
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

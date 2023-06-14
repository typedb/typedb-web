import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

declare global {
    interface Window {
        _hsq: any[];
    }
}

export const HUBSPOT_PORTAL_ID = "4332244";
export const HUBSPOT_REGION = "na1";

@Injectable({
    providedIn: "root",
})
export class AnalyticsService {
    private _hubspotTrackingCodeLoaded = false;
    hubspot = {
        trackPageView: () => {
            // HubSpot tracking code
            const _hsq = window._hsq = window._hsq || [];
            _hsq.push(['setPath', this._router.url]);
            if (this._hubspotTrackingCodeLoaded) {
                _hsq.push(['trackPageView']);
            } else {
                const scriptEl = document.createElement("script");
                scriptEl.src = `//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;
                document.head.appendChild(scriptEl);
                this._hubspotTrackingCodeLoaded = true;
            }
        }
    }
    googleAnalytics = {
        loadScriptTag: () => {

        }
    }

    constructor(private _router: Router) {}
}

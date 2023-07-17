import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "../../service/analytics.service";
import { IdleMonitorService } from "@scullyio/ng-lib";

@Component({
    selector: "td-privacy-policy-page",
    templateUrl: "./privacy-policy-page.component.html",
    styleUrls: ["./privacy-policy-page.component.scss"],
})
export class PrivacyPolicyPageComponent implements OnInit {
    cookies: Cookie[] = [{
        source: "Google Analytics",
        name: "_ga",
        purpose: "Used to distinguish users.",
    }, {
        source: "Google Analytics",
        name: "_gat",
        purpose: "Used to distinguish users.",
    }, {
        source: "Google Analytics",
        name: "_gid",
        purpose: "Used to distinguish users.",
    }, {
        source: "HubSpot",
        name: "__hstc",
        purpose: "Used to distinguish users.",
    }, {
        source: "HubSpot",
        name: "hubspotutk",
        purpose: "Used to distinguish users.",
    }, {
        source: "HubSpot",
        name: "__hssc",
        purpose: "Used to distinguish users.",
    }, {
        source: "HubSpot",
        name: "__hssrc",
        purpose: "Used to distinguish users.",
    }];

    constructor(private _analytics: AnalyticsService, private _idleMonitor: IdleMonitorService) {}

    ngOnInit() {
        this._analytics.hubspot.trackPageView();
        setTimeout(() => { this._idleMonitor.fireManualMyAppReadyEvent() }, 10000);
    }
}

interface Cookie {
    source: string;
    name: string;
    purpose: string;
}

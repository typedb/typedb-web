import { Component, OnInit } from "@angular/core";

import { AnalyticsService } from "../../service/analytics.service";

@Component({
    selector: "td-not-found-page",
    templateUrl: "./not-found-page.component.html",
    styleUrls: ["./not-found-page.component.scss"],
})
export class NotFoundPageComponent implements OnInit {
    constructor(private _analytics: AnalyticsService) {}

    ngOnInit() {
        this._analytics.hubspot.trackPageView();
    }
}

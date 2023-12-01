import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { AnalyticsService } from "../../service/analytics.service";

@Component({
    selector: "td-404-page",
    templateUrl: "./404-page.component.html",
    styleUrls: ["./404-page.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class _404PageComponent implements OnInit {
    constructor(private _analytics: AnalyticsService) {}

    ngOnInit() {
        this._analytics.hubspot.trackPageView();
    }
}

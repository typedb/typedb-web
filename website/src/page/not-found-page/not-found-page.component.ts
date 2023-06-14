import {Component, OnInit} from "@angular/core";
import { HubspotPixelService } from "../../service/hubspot-pixel.service";

@Component({
    selector: 'not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent implements OnInit {
    constructor(private _hubspotPixelService: HubspotPixelService) {}

    ngOnInit() {
        this._hubspotPixelService.trackPageView();
    }
}

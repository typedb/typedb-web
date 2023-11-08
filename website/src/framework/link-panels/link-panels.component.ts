import { Component, Input } from "@angular/core";

import { LinkPanelWithIcon, ResourceLink, Webinar } from "typedb-web-schema";

@Component({
    selector: "td-link-panels",
    templateUrl: "link-panels.component.html",
    styleUrls: ["link-panels.component.scss"],
})
export class LinkPanelsComponent {
    @Input() panels!: LinkPanelWithIcon[];
}

@Component({
    selector: "td-resource-panels",
    templateUrl: "resource-panels.component.html",
    styleUrls: ["link-panels.component.scss"],
})
export class ResourcePanelsComponent {
    @Input() resources!: ResourceLink[];
    @Input() cols!: 3 | 4;
}

@Component({
    selector: "td-resource-panels-cols-2",
    templateUrl: "link-panels-cols-2.component.html",
    styleUrls: ["link-panels-cols-2.component.scss"],
})
export class LinkPanelsCols2Component {
    @Input() resources!: ResourceLink[];
}

@Component({
    selector: "td-webinar-panels",
    templateUrl: "webinar-panels.component.html",
    styleUrls: ["webinar-panels.component.scss"],
})
export class WebinarPanelsComponent {
    @Input() webinars!: Webinar[];

    private _hoveredPanels = new Map<Webinar, boolean>();

    setPanelHovered(panel: Webinar, value: boolean) {
        this._hoveredPanels.set(panel, value);
    }

    isPanelHovered(panel: Webinar) {
        return this._hoveredPanels.get(panel) === true;
    }
}

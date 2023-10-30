import { Component, Input } from "@angular/core";

import { LinkPanel, ResourceLinkPanel, Webinar } from "typedb-web-schema";

@Component({
    selector: "td-link-panels",
    templateUrl: "link-panels.component.html",
    styleUrls: ["link-panels.component.scss"],
})
export class LinkPanelsComponent {
    @Input() panels!: (LinkPanel | ResourceLinkPanel)[];
    @Input() cols!: 3 | 4;
    @Input() ctaStrength: "weak" | "strong" = "weak";

    private _hoveredPanels = new Map<LinkPanel | ResourceLinkPanel, boolean>();

    setPanelHovered(panel: LinkPanel | ResourceLinkPanel, value: boolean) {
        this._hoveredPanels.set(panel, value);
    }

    isPanelHovered(panel: LinkPanel | ResourceLinkPanel) {
        return this._hoveredPanels.get(panel) === true;
    }
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

import { Component, Input, OnInit } from "@angular/core";
import { ContentPanel } from "typedb-web-schema";
import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-content-tabs",
    templateUrl: "content-tabs.component.html",
    styleUrls: ["content-tabs.component.scss"],
})
export class ContentTabsComponent implements OnInit {
    @Input() tabs!: ContentPanel[];
    selectedTab!: ContentPanel;

    ngOnInit() {
        this.selectedTab = this.tabs[0];
    }

    tabID(tab: ContentPanel): string {
        return sanitiseHtmlID(tab.title);
    }

    setSelectedTab(tab: ContentPanel) {
        // TODO: invoke when navigating via hashroute
        this.selectedTab = tab;
    }
}

import { Component, Input, OnInit } from "@angular/core";
import { ContentTab, ContentTextTab } from "typedb-web-schema";
import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-content-tabs",
    templateUrl: "content-tabs.component.html",
    styleUrls: ["content-tabs.component.scss"],
})
export class ContentTabsComponent implements OnInit {
    @Input() tabs!: ContentTab[];
    selectedTab!: ContentTab;

    ngOnInit() {
        this.selectedTab = this.tabs[0];
    }

    get contentTextTabs(): ContentTextTab[] | undefined {
        return this.tabs.every(x => x instanceof ContentTextTab) ? this.tabs.map(x => x as ContentTextTab) : undefined;
    }

    tabID(tab: ContentTab): string {
        return sanitiseHtmlID(tab.title);
    }

    setSelectedTab(tab: ContentTab) {
        // TODO: invoke when navigating via hashroute
        this.selectedTab = tab;
    }
}

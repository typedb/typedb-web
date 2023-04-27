import { Component, Input, OnInit } from "@angular/core";
import { ContentPanel, HomePageUseCase } from "typedb-web-schema";
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

@Component({
    selector: "td-vertical-content-tabs",
    templateUrl: "./vertical-content-tabs.component.html",
    styleUrls: ["./vertical-content-tabs.component.scss"],
})
export class VerticalContentTabsComponent implements OnInit {
    @Input() useCases!: HomePageUseCase[];
    selectedUseCase!: HomePageUseCase;

    ngOnInit() {
        this.selectedUseCase = this.useCases[0];
    }

    tabID(useCase: HomePageUseCase): string {
        return sanitiseHtmlID(useCase.title);
    }

    setSelectedTab(useCase: HomePageUseCase) {
        // TODO: invoke when navigating via hashroute
        this.selectedUseCase = useCase;
    }
}

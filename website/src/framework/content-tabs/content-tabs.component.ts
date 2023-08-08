import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Event as RouterEvent, Router, Scroll } from "@angular/router";
import { filter } from "rxjs";
import { ContentTextPanel } from "typedb-web-schema";
import { sanitiseHtmlID } from "../util";

@Component({
    selector: "td-content-tabs",
    templateUrl: "content-tabs.component.html",
    styleUrls: ["content-tabs.component.scss"],
})
export class ContentTabsComponent implements OnInit {
    @Input() tabs!: ContentTextPanel[];
    @Input() setWindowHashOnTabClick = false;
    private _elementID!: string;
    selectedTabID: string | undefined;

    constructor(
        private router: Router,
        private _el: ElementRef,
    ) {
        router.events.pipe(filter((e: RouterEvent): e is Scroll => e instanceof Scroll)).subscribe((_e) => {
            this.setSelectedTabFromWindowHash();
        });
    }

    ngOnInit() {
        if (!this._el.nativeElement.id.length) {
            throw `${this.constructor.name}'s native HTML element must have an id set`;
        }
        this._elementID = this._el.nativeElement.id;
        this.setSelectedTabFromWindowHash();
        if (!this.selectedTabID) {
            this.selectedTabID = this.tabID(this.tabs[0]);
        }
    }

    get selectedTab(): ContentTextPanel {
        const selectedTab = this.tabs.find((x) => this.tabID(x) === this.selectedTabID);
        if (selectedTab) return selectedTab;
        else throw "Unreachable code";
    }

    tabID(tab: ContentTextPanel): string {
        return `${this._elementID}-${sanitiseHtmlID(tab.title)}`;
    }

    setSelectedTabFromWindowHash() {
        const targetedTab = this.tabs.find((x) => this.tabID(x) === window.location.hash.slice(1));
        if (targetedTab) this.setSelectedTab(targetedTab);
    }

    onTabClick(tab: ContentTextPanel, event: Event) {
        event.preventDefault();
        if (event.currentTarget instanceof HTMLElement) {
            event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
        this.setSelectedTab(tab);
    }

    setSelectedTab(tab: ContentTextPanel) {
        this.selectedTabID = this.tabID(tab);
        if (this.setWindowHashOnTabClick) {
            this.router.navigate([], {
                fragment: this.tabID(tab),
                state: { preventScrollToAnchor: true },
            });
        }
    }
}

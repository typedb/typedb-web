import { Component, HostListener, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { communityResourcesSchemaName, SanityCommunityResources, SanityTopbar, Topbar, TopbarListColumn, TopbarMenuPanel, topbarSchemaName, TopbarVideoColumn } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";

@Component({
    selector: "td-topbar",
    templateUrl: "./topbar.component.html",
    styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent implements OnInit {
    topbar?: Topbar;
    githubURL?: string;
    hoveredMenuItem?: TopbarMenuPanel;
    hoveredMenuPanel?: TopbarMenuPanel;
    focusedMenuPanel?: TopbarMenuPanel;
    private _pageYOffset = 0;

    constructor(private router: Router, private contentService: ContentService) {}

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityTopbar = data.byId[topbarSchemaName] as SanityTopbar;
            if (sanityTopbar) {
                this.topbar = new Topbar(sanityTopbar, data);
            } else {
                this.topbar = undefined;
            }
            const communityResources = data.byId[communityResourcesSchemaName] as SanityCommunityResources;
            if (communityResources) {
                this.githubURL = communityResources.githubURL;
            }
        });
    }

    get menuPanels(): TopbarMenuPanel[] {
        return this.topbar!.mainArea.filter(this.isMenuPanel);
    }

    get rootNgClass(): { [clazz: string]: boolean } {
        return { "tb-solid": this._pageYOffset > 0 || !!this.hoveredMenuPanel };
    }

    isMenuPanel(obj: any): obj is TopbarMenuPanel {
        return obj instanceof TopbarMenuPanel;
    }

    isMenuPanelVisible(menuPanel: TopbarMenuPanel): boolean {
        return [this.hoveredMenuItem, this.hoveredMenuPanel, this.focusedMenuPanel].includes(menuPanel);
    }

    onMenuItemMouseEnter(menuPanel: TopbarMenuPanel) {
        this.hoveredMenuItem = menuPanel;
        this.focusedMenuPanel = undefined;
    }

    onMenuItemMouseLeave(menuPanel: TopbarMenuPanel) {
        if (this.hoveredMenuItem === menuPanel) this.hoveredMenuItem = undefined;
        this.focusedMenuPanel = undefined;
    }

    onMenuPanelMouseEnter(menuPanel: TopbarMenuPanel) {
        this.hoveredMenuPanel = menuPanel;
        this.focusedMenuPanel = undefined;
    }

    onMenuPanelMouseLeave(menuPanel: TopbarMenuPanel) {
        if (this.hoveredMenuPanel === menuPanel) this.hoveredMenuPanel = undefined;
        this.focusedMenuPanel = undefined;
    }

    @HostListener("window:keyup.escape", ["$event"])
    onEscKeyPressed(_event: KeyboardEvent) {
        this.focusedMenuPanel = undefined;
    }

    @HostListener("window:scroll", ["$event"])
    onWindowScroll(_event: any) {
        this._pageYOffset = window.pageYOffset;
    }
}

@Component({
    selector: "td-topbar-menu-panel",
    templateUrl: "./menu-panel.component.html",
    styleUrls: ["./menu-panel.component.scss"],
})
export class TopbarMenuPanelComponent {
    @Input() menuPanel!: TopbarMenuPanel;

    get columns() {
        return this.menuPanel.columns;
    }

    get title() {
        return this.menuPanel.title;
    }

    isListColumn(obj: any): obj is TopbarListColumn {
        return obj instanceof TopbarListColumn;
    }

    isVideoColumn(obj: any): obj is TopbarVideoColumn {
        return obj instanceof TopbarVideoColumn;
    }
}

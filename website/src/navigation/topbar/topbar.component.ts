import { Component, HostListener, Input, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { communityResourcesSchemaName, SanityCommunityResources, SanityTopbar, TextLink, Topbar, TopbarListColumn, TopbarMenuPanel, topbarSchemaName, TopbarVideoColumn } from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { DialogService } from "../../service/dialog.service";

@Component({
    selector: "td-topbar",
    templateUrl: "./topbar.component.html",
    styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent implements OnInit {
    topbar?: Topbar;
    githubURL?: string;
    hoveredMenuItem?: TopbarMenuPanel;
    focusedMenuItem?: TopbarMenuPanel;
    hoveredMenuPanel?: TopbarMenuPanel;
    focusedMenuPanel?: TopbarMenuPanel;

    constructor(private router: Router, private contentService: ContentService, private dialogService: DialogService, private _ngZone: NgZone) {
        this._ngZone.runOutsideAngular(() => {
            window.addEventListener("scroll", () => {
                const headerEl = document.getElementById("siteHeader");
                if (headerEl) headerEl.style.backgroundColor = `rgba(26, 24, 42, ${window.pageYOffset / 500})`; // vaticle purple
            });
        });
    }

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityTopbar = data.getDocumentByID(topbarSchemaName) as SanityTopbar;
            if (sanityTopbar) {
                this.topbar = new Topbar(sanityTopbar, data);
            } else {
                this.topbar = undefined;
            }
            const communityResources = data.getDocumentByID(communityResourcesSchemaName) as SanityCommunityResources;
            if (communityResources) {
                this.githubURL = communityResources.githubURL;
            }
        });
    }

    get rootNgClass(): { [clazz: string]: boolean } {
        return { "tb-solid": this.shouldForceOpaque };
    }

    private get shouldForceOpaque(): boolean {
        return !!this.hoveredMenuPanel || !!this.dialogService.current;
    }

    isMenuPanel(obj: any): obj is TopbarMenuPanel {
        return obj instanceof TopbarMenuPanel;
    }

    isTextLink(obj: any): obj is TextLink {
        return obj instanceof TextLink;
    }

    isMenuPanelVisible(menuPanel: TopbarMenuPanel): boolean {
        return [this.hoveredMenuItem, this.hoveredMenuPanel, this.focusedMenuItem, this.focusedMenuPanel].includes(menuPanel);
    }

    onMenuItemMouseEnter(menuPanel: TopbarMenuPanel) {
        this.hoveredMenuItem = menuPanel;
        if (this.focusedMenuItem !== menuPanel) this.clearFocus();
        this.focusedMenuPanel = undefined;
    }

    clearFocus() {
        (document.activeElement as HTMLElement)?.blur();
    }

    onMenuItemMouseLeave(menuPanel: TopbarMenuPanel) {
        if (this.hoveredMenuItem === menuPanel) this.hoveredMenuItem = undefined;
        this.focusedMenuPanel = undefined;
    }

    onMenuItemFocus(menuPanel: TopbarMenuPanel) {
        this.focusedMenuItem = menuPanel;
    }

    onMenuItemBlur(menuPanel: TopbarMenuPanel) {
        if (this.focusedMenuItem === menuPanel) this.focusedMenuItem = undefined;
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
        this.clearFocus();
        this.focusedMenuPanel = undefined;
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

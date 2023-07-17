import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    NgZone,
    OnInit,
    Output,
} from "@angular/core";
import { Router } from "@angular/router";
import {
    communityResourcesSchemaName,
    SanityCommunityResources,
    SanitySiteBanner,
    SanityTopbar,
    SiteBanner,
    siteBannerSchemaName,
    TextLink,
    Topbar,
    TopbarListColumn,
    TopbarListColumnItem,
    TopbarMenuPanel,
    topbarSchemaName,
    TopbarVideoColumn,
} from "typedb-web-schema";
import { ContentService } from "../../service/content.service";
import { DialogService } from "../../service/dialog.service";
import { TopbarMobileService } from "../../service/topbar-mobile.service";

@Component({
    selector: "td-topbar",
    templateUrl: "./topbar-menu.component.html",
    styleUrls: ["./topbar-menu.component.scss"],
})
export class TopbarMenuComponent implements OnInit {
    topbar?: Topbar;
    siteBanner?: SiteBanner;
    githubURL?: string;
    hoveredMenuItem?: TopbarMenuPanel;
    focusedMenuItem?: TopbarMenuPanel;
    hoveredMenuPanel?: TopbarMenuPanel;
    focusedMenuPanel?: TopbarMenuPanel;

    constructor(
        private router: Router,
        private contentService: ContentService,
        private dialogService: DialogService,
        private _topbarMobileService: TopbarMobileService,
        private _ngZone: NgZone
    ) {
        this._ngZone.runOutsideAngular(() => {
            window.addEventListener("scroll", () => {
                const headerEl = document.getElementById("siteHeader");
                if (headerEl) {
                    headerEl.style.backgroundColor = `rgba(26, 24, 42, ${
                        window.pageYOffset / 300
                    })`; // vaticle purple
                    headerEl.style.borderBottomColor =
                        window.pageYOffset >= 300 ? "#232135" : "transparent"; // vaticle secondary purple
                }
            });
        });
    }

    ngOnInit() {
        this.contentService.data.subscribe((data) => {
            const sanityTopbar = data.getDocumentByID(
                topbarSchemaName
            ) as SanityTopbar;
            this.topbar = sanityTopbar
                ? new Topbar(sanityTopbar, data)
                : undefined;
            const communityResources = data.getDocumentByID(
                communityResourcesSchemaName
            ) as SanityCommunityResources;
            this.githubURL = communityResources?.githubURL;
            const sanitySiteBanner = data.getDocumentByID(
                siteBannerSchemaName
            ) as SanitySiteBanner;
            this.siteBanner = sanitySiteBanner?.isEnabled
                ? SiteBanner.fromSanity(sanitySiteBanner, data)
                : undefined;
        });
    }

    get rootNgClass(): { [clazz: string]: boolean } {
        return {
            "tb-solid": this.shouldForceOpaque,
            "has-banner": !!this.siteBanner,
        };
    }

    get mobileMenuIsOpen(): boolean {
        return this._topbarMobileService.openState.getValue();
    }

    private get shouldForceOpaque(): boolean {
        return (
            !!this.hoveredMenuPanel ||
            !!this.dialogService.current ||
            this.mobileMenuIsOpen
        );
    }

    isMenuPanel(obj: any): obj is TopbarMenuPanel {
        return obj instanceof TopbarMenuPanel;
    }

    isTextLink(obj: any): obj is TextLink {
        return obj instanceof TextLink;
    }

    isMenuPanelVisible(menuPanel: TopbarMenuPanel): boolean {
        return [
            this.hoveredMenuItem,
            this.hoveredMenuPanel,
            this.focusedMenuItem,
            this.focusedMenuPanel,
        ].includes(menuPanel);
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
        if (this.hoveredMenuItem === menuPanel)
            this.hoveredMenuItem = undefined;
        this.focusedMenuPanel = undefined;
    }

    onMenuItemFocus(menuPanel: TopbarMenuPanel) {
        this.focusedMenuItem = menuPanel;
    }

    onMenuItemBlur(menuPanel: TopbarMenuPanel) {
        if (this.focusedMenuItem === menuPanel)
            this.focusedMenuItem = undefined;
    }

    onMenuPanelMouseEnter(menuPanel: TopbarMenuPanel) {
        this.hoveredMenuPanel = menuPanel;
        this.focusedMenuPanel = undefined;
    }

    onMenuPanelMouseLeave(menuPanel: TopbarMenuPanel) {
        if (this.hoveredMenuPanel === menuPanel)
            this.hoveredMenuPanel = undefined;
        this.focusedMenuPanel = undefined;
    }

    onMenuItemClick(item: TopbarListColumnItem) {
        this.hoveredMenuPanel = undefined;
        this.hoveredMenuItem = undefined;
        this.focusedMenuPanel = undefined;
        this.focusedMenuItem = undefined;
        this.clearFocus();
    }

    @HostListener("window:keyup.escape", ["$event"])
    onEscKeyPressed(_event: KeyboardEvent) {
        this.clearFocus();
        this.focusedMenuPanel = undefined;
    }

    toggleMobileMenu() {
        this._topbarMobileService.toggleOpenState();
    }

    hideMobileMenu() {
        this._topbarMobileService.setClosedState();
    }
}

@Component({
    selector: "td-topbar-menu-panel",
    templateUrl: "./topbar-menu-panel.component.html",
    styleUrls: ["./topbar-menu-panel.component.scss"],
})
export class TopbarMenuPanelComponent {
    @Input() menuPanel!: TopbarMenuPanel;
    @Output() itemclick = new EventEmitter<TopbarListColumnItem>();

    comingSoonPopupVisible: Map<TopbarListColumnItem, boolean> = new Map<
        TopbarListColumnItem,
        boolean
    >();

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

    onMouseEnter(item: TopbarListColumnItem) {
        if (item.comingSoon) this.comingSoonPopupVisible.set(item, true);
    }

    onMouseLeave(item: TopbarListColumnItem) {
        if (item.comingSoon) this.comingSoonPopupVisible.set(item, false);
    }

    onClick(item: TopbarListColumnItem) {
        this.itemclick.emit(item);
    }
}

@Component({
    selector: "td-topbar-menu-mobile",
    templateUrl: "./topbar-menu-mobile.component.html",
    styleUrls: ["./topbar-menu-mobile.component.scss"],
})
export class TopbarMenuMobileComponent {
    @Input() topbar!: Topbar;
    @Input() githubURL?: string;

    constructor(private _topbarMobileService: TopbarMobileService) {}

    visibleMenuPanels = new Set<TopbarMenuPanel>();

    isMenuPanel(obj: any): obj is TopbarMenuPanel {
        return obj instanceof TopbarMenuPanel;
    }

    isTextLink(obj: any): obj is TextLink {
        return obj instanceof TextLink;
    }

    isMenuPanelVisible(menuPanel: TopbarMenuPanel): boolean {
        return this.visibleMenuPanels.has(menuPanel);
    }

    toggleMenuPanelVisible(menuPanel: TopbarMenuPanel) {
        if (this.visibleMenuPanels.has(menuPanel)) {
            this.visibleMenuPanels.delete(menuPanel);
        } else {
            this.visibleMenuPanels.add(menuPanel);
        }
    }

    clearFocus() {
        (document.activeElement as HTMLElement)?.blur();
    }

    onMenuItemClick() {
        this.clearFocus();
        this._topbarMobileService.setClosedState();
    }
}

@Component({
    selector: "td-topbar-menu-panel-mobile",
    templateUrl: "./topbar-menu-panel-mobile.component.html",
    styleUrls: ["./topbar-menu-panel-mobile.component.scss"],
})
export class TopbarMenuPanelMobileComponent {
    @Input() menuPanel!: TopbarMenuPanel;
    @Output() itemclick = new EventEmitter<TopbarListColumnItem>();

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

    onClick(item: TopbarListColumnItem) {
        this.itemclick.emit(item);
    }
}

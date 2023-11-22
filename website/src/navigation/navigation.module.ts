import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { FrameworkModule } from "../framework/framework.module";
import { FeedbackButtonComponent } from "./feedback/feedback-button.component";
import { FooterComponent } from "./footer/footer.component";
import { SiteBannerComponent } from "./site-banner/site-banner.component";
import {
    TopbarMenuComponent,
    TopbarMenuMobileComponent,
    TopbarMenuPanelComponent,
    TopbarMenuPanelMobileComponent,
} from "./topbar/topbar-menu.component";

@NgModule({
    declarations: [
        FeedbackButtonComponent,
        FooterComponent,
        SiteBannerComponent,
        TopbarMenuComponent,
        TopbarMenuMobileComponent,
        TopbarMenuPanelComponent,
        TopbarMenuPanelMobileComponent,
    ],
    imports: [BrowserModule, FormsModule, FrameworkModule, HttpClientModule, RouterModule],
    providers: [],
    exports: [FeedbackButtonComponent, FooterComponent, TopbarMenuComponent],
})
export class NavigationModule {}

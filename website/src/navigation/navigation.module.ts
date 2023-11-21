import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { FrameworkModule } from "../framework/framework.module";
import { FooterComponent } from "./footer/footer.component";
import { SiteBannerComponent } from "./site-banner/site-banner.component";
import { TopbarMenuComponent } from "./topbar/topbar-menu.component";

@NgModule({
    declarations: [FooterComponent, SiteBannerComponent, TopbarMenuComponent],
    imports: [BrowserModule, FormsModule, FrameworkModule, HttpClientModule, RouterModule],
    providers: [],
    exports: [FooterComponent, TopbarMenuComponent],
})
export class NavigationModule {}

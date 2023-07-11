import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { FrameworkModule } from "../framework/framework.module";
import { FooterComponent } from "./footer/footer.component";
import { FormsModule } from "@angular/forms";
import { SiteBannerComponent } from "./site-banner/site-banner.component";
import { TopbarMenuComponent, TopbarMenuPanelComponent, TopbarMenuMobileComponent, TopbarMenuPanelMobileComponent } from "./topbar/topbar-menu.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        FooterComponent,
        SiteBannerComponent,
        TopbarMenuComponent,
        TopbarMenuMobileComponent,
        TopbarMenuPanelComponent,
        TopbarMenuPanelMobileComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FrameworkModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        RouterModule,
    ],
    providers: [],
    exports: [
        FooterComponent,
        TopbarMenuComponent
    ]
})
export class NavigationModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FrameworkModule } from "../framework/framework.module";
import { FooterComponent } from "./footer/footer.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TopbarComponent, TopbarMenuPanelComponent } from "./topbar/topbar.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        FooterComponent,
        TopbarComponent,
        TopbarMenuPanelComponent,
        SidenavComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        FrameworkModule,
        HttpClientModule,
        RouterModule,
    ],
    providers: [],
    exports: [
        FooterComponent,
        TopbarComponent
    ]
})
export class NavigationModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageLayoutComponent } from "./page-layout/page-layout.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TopbarComponent } from "./topbar/topbar.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        TopbarComponent,
        SidenavComponent,
        PageLayoutComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
    ],
    providers: [
    ],
})
export class LayoutModule { }

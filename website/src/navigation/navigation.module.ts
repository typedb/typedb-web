import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidenavComponent } from "./sidenav/sidenav.component";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TopbarComponent } from "./topbar/topbar.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        TopbarComponent,
        SidenavComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        RouterModule,
    ],
    providers: [],
    exports: [
        TopbarComponent
    ]
})
export class NavigationModule { }

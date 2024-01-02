import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { FrameworkModule } from "../framework/framework.module";
import { FeedbackButtonComponent } from "./feedback/feedback-button.component";
import { FooterComponent } from "./footer/footer.component";
import { TopbarMenuComponent } from "./topbar/topbar-menu.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        FrameworkModule,
        HttpClientModule,
        RouterModule,
        FeedbackButtonComponent,
        FooterComponent,
        TopbarMenuComponent,
    ],
    providers: [],
    exports: [FeedbackButtonComponent, FooterComponent, TopbarMenuComponent],
})
export class NavigationModule {}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrameworkModule } from "./framework/framework.module";
import { NavigationModule } from "./navigation/navigation.module";
import { PageModule } from "./page/page.module";
import { ServiceModule } from "./service/service.module";
import { WebsiteRoutingModule } from "./website-routing.module";
import { WebsiteComponent } from "./website.component";
import { FormsModule } from "@angular/forms";
import { isScullyRunning, ScullyLibModule } from "@scullyio/ng-lib";
import { HttpClientModule } from "@angular/common/http";
import { NgcCookieConsentModule, NgcCookieConsentConfig } from "ngx-cookieconsent";

const cookieConfig: NgcCookieConsentConfig = {
    enabled: !isScullyRunning(),
    cookie: {
        domain: window.location.hostname,
    },
    theme: "block",
    content: {
        href: "/privacy-policy",
    },
    type: "info"
};

// TODO: integrate prettier
@NgModule({
    declarations: [
        WebsiteComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        FrameworkModule,
        HttpClientModule,
        NavigationModule,
        NgcCookieConsentModule.forRoot(cookieConfig),
        PageModule,
        ScullyLibModule,
        ServiceModule,
        WebsiteRoutingModule,
    ],
    providers: [],
    bootstrap: [WebsiteComponent]
})
export class WebsiteModule { }

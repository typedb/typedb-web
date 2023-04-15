import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameworkModule } from "./framework/framework.module";
import { NavigationModule } from "./navigation/navigation.module";
import { PageModule } from "./page/page.module";
import { ServiceModule } from "./service/service.module";
import { WebsiteRoutingModule } from "./website-routing.module";
import { WebsiteComponent } from "./website.component";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ScullyLibModule } from "@scullyio/ng-lib";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        WebsiteComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        FrameworkModule,
        HttpClientModule,
        NavigationModule,
        PageModule,
        ScullyLibModule,
        ServiceModule,
        WebsiteRoutingModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [WebsiteComponent]
})
export class WebsiteModule { }

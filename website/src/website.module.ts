import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameworkModule } from "./framework/framework.module";
import { LayoutModule } from "./layout/layout.module";
import { PageModule } from "./page/page.module";
import { ServiceModule } from "./service/service.module";
import { WebsiteRoutingModule } from "./website-routing.module";
import { WebsiteComponent } from "./website.component";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ScullyLibModule } from "@scullyio/ng-lib";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        WebsiteComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        FrameworkModule,
        LayoutModule,
        HttpClientModule,
        PageModule,
        ScullyLibModule,
        ServiceModule,
        WebsiteRoutingModule,
    ],
    providers: [],
    bootstrap: [WebsiteComponent]
})
export class WebsiteModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebsiteRoutingModule } from "./website-routing.module";
import { WebsiteComponent } from "./website.component";
import { PageContainerComponent } from "./framework/page-container/page-container.component";
import { NotFoundPageComponent } from "./module/not-found-page/not-found-page.component";
import { FormsModule } from "@angular/forms";
import { SpinningWheelComponent } from "./framework/spinning-wheel/spinning-wheel.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {VaticleTopbarComponent} from "./module/vaticle-topbar/vaticle-topbar.component";
import {VaticleSidebarComponent} from "./module/vaticle-sidebar/vaticle-sidebar.component";
import {IndexPageComponent} from "./module/index-page/index-page.component";
import {VaticlePageContainer} from "./module/vaticle-page-container/vaticle-page-container";
import {ApiService} from "./services/api.service";
import {ModalComponent} from "./framework/modal/modal.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        WebsiteComponent,
        IndexPageComponent,
        PageContainerComponent,
        NotFoundPageComponent,
        SpinningWheelComponent,
        VaticleTopbarComponent,
        VaticleSidebarComponent,
        VaticlePageContainer,
        ModalComponent,
    ],
    imports: [
        WebsiteRoutingModule,
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule
    ],
    providers: [
        ApiService,
    ],
    bootstrap: [WebsiteComponent]
})
export class WebsiteModule { }

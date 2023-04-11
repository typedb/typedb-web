import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameworkModule } from "../framework/framework.module";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { HomePageTechnicolorBlockComponent, HomePageComponent, HomePageOrganisationLogosComponent, HomePageFeatureTabsComponent } from "./home-page/home-page.component";

@NgModule({
    declarations: [
        HomePageTechnicolorBlockComponent,
        HomePageComponent,
        HomePageFeatureTabsComponent,
        HomePageOrganisationLogosComponent,
        NotFoundPageComponent,
    ],
    imports: [
        BrowserModule,
        FrameworkModule,
    ],
    providers: [],
})
export class PageModule { }

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameworkModule } from "../framework/framework.module";
import { IntroPageComponent, IntroPageTechnicolorBlockComponent } from "./intro-page/intro-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { HomePageTechnicolorBlockComponent, HomePageComponent, HomePageOrganisationLogosComponent, HomePageUseCasesComponent } from "./home-page/home-page.component";

@NgModule({
    declarations: [
        HomePageTechnicolorBlockComponent,
        HomePageComponent,
        HomePageOrganisationLogosComponent,
        HomePageUseCasesComponent,
        IntroPageComponent,
        IntroPageTechnicolorBlockComponent,
        NotFoundPageComponent,
    ],
    imports: [
        BrowserModule,
        FrameworkModule,
    ],
    providers: [],
})
export class PageModule { }

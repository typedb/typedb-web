import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameworkModule } from "../framework/framework.module";
import { FeaturesPageComponent, FeaturesPageTechnicolorBlockComponent } from "./features-page/features-page.component";
import { IntroPageComponent, IntroPageTechnicolorBlockComponent } from "./intro-page/intro-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { HomePageTechnicolorBlockComponent, HomePageComponent } from "./home-page/home-page.component";
import { UseCasePageComponent, UseCasePageTechnicolorBlockComponent } from "./use-case-page/use-case-page.component";

@NgModule({
    declarations: [
        FeaturesPageComponent,
        FeaturesPageTechnicolorBlockComponent,
        HomePageComponent,
        HomePageTechnicolorBlockComponent,
        IntroPageComponent,
        IntroPageTechnicolorBlockComponent,
        NotFoundPageComponent,
        UseCasePageComponent,
        UseCasePageTechnicolorBlockComponent,
    ],
    imports: [
        BrowserModule,
        FrameworkModule,
    ],
    providers: [],
})
export class PageModule { }

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameworkModule } from "../framework/framework.module";
import { DeploymentPageComponent, DeploymentPageTechnicolorBlockComponent } from "./deployment-page/deployment-page.component";
import { GenericPageComponent, GenericPageTechnicolorBlockComponent } from "./generic-page/generic-page.component";
import { FeaturesPageComponent, FeaturesPageTechnicolorBlockComponent } from "./features-page/features-page.component";
import { IntroPageComponent, IntroPageTechnicolorBlockComponent } from "./intro-page/intro-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { HomePageTechnicolorBlockComponent, HomePageComponent } from "./home-page/home-page.component";
import { SolutionPageComponent, SolutionPageTechnicolorBlockComponent } from "./solution-page/solution-page.component";
import { WebinarsPageComponent } from "./webinars-page/webinars-page.component";

@NgModule({
    declarations: [
        DeploymentPageComponent,
        DeploymentPageTechnicolorBlockComponent,
        GenericPageComponent,
        GenericPageTechnicolorBlockComponent,
        FeaturesPageComponent,
        FeaturesPageTechnicolorBlockComponent,
        HomePageComponent,
        HomePageTechnicolorBlockComponent,
        IntroPageComponent,
        IntroPageTechnicolorBlockComponent,
        NotFoundPageComponent,
        SolutionPageComponent,
        SolutionPageTechnicolorBlockComponent,
        WebinarsPageComponent,
    ],
    imports: [
        BrowserModule,
        FrameworkModule,
    ],
    providers: [],
})
export class PageModule { }

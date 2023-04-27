import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeaturesPageComponent } from "./page/features-page/features-page.component";
import { HomePageComponent } from "./page/home-page/home-page.component";
import { IntroPageComponent } from "./page/intro-page/intro-page.component";
import { NotFoundPageComponent } from "./page/not-found-page/not-found-page.component";
import { UseCasePageComponent } from "./page/use-case-page/use-case-page.component";

const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "features", component: FeaturesPageComponent },
    { path: "introduction", component: IntroPageComponent },
    { path: "use-case/:route", component: UseCasePageComponent },
    { path: "**", component: NotFoundPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
    exports: [RouterModule]
})
export class WebsiteRoutingModule { }

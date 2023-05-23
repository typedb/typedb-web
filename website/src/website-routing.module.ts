import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GenericPageComponent } from "./page/generic-page/generic-page.component";
import { FeaturesPageComponent } from "./page/features-page/features-page.component";
import { HomePageComponent } from "./page/home-page/home-page.component";
import { IntroPageComponent } from "./page/intro-page/intro-page.component";
import { NotFoundPageComponent } from "./page/not-found-page/not-found-page.component";
import { SolutionPageComponent } from "./page/solution-page/solution-page.component";
// import { WebinarsPageComponent } from "./page/webinars-page/webinars-page.component";

const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "introduction", component: IntroPageComponent },
    { path: "features", component: FeaturesPageComponent },
    { path: "cloud", component: GenericPageComponent, data: { documentID: "cloudPage" } },
    { path: "studio", component: GenericPageComponent, data: { documentID: "studioPage" } },
    { path: "solution/:route", component: SolutionPageComponent },
    // { path: "webinars", component: WebinarsPageComponent },
    { path: "**", component: NotFoundPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "disabled" })],
    exports: [RouterModule]
})
export class WebsiteRoutingModule { }

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeaturesPageComponent } from "./page/features-page/features-page.component";
import { HomePageComponent } from "./page/home-page/home-page.component";
import { IntroPageComponent } from "./page/intro-page/intro-page.component";
import { NotFoundPageComponent } from "./page/not-found-page/not-found-page.component";

const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "features", component: FeaturesPageComponent },
    { path: "introduction", component: IntroPageComponent },
    { path: "**", component: NotFoundPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class WebsiteRoutingModule { }

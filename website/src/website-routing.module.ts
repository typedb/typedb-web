import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./page/home-page/home-page.component";
import { NotFoundPageComponent } from "./page/not-found-page/not-found-page.component";

const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "**", component: NotFoundPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class WebsiteRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundPageComponent} from "./module/not-found-page/not-found-page.component";
import {IndexPageComponent} from "./module/index-page/index-page.component";

const routes: Routes = [
    {path: "", redirectTo: "index", pathMatch: "full"},
    {path: "index", component: IndexPageComponent},
    {path: "**", component: NotFoundPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class WebsiteRoutingModule { }

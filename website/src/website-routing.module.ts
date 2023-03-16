import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GenericPageComponent } from "./page/generic-page/generic-page.component";

const routes: Routes = [
    { path: "", component: GenericPageComponent },
    { path: ":route", component: GenericPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class WebsiteRoutingModule { }

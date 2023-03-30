import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameworkModule } from "../framework/framework.module";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { HomePageComponent } from "./home-page/home-page.component";

@NgModule({
    declarations: [
        HomePageComponent,
        NotFoundPageComponent,
    ],
    imports: [
        BrowserModule,
        FrameworkModule,
    ],
    providers: [],
})
export class PageModule { }

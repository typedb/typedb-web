import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameworkModule } from "../framework/framework.module";
import { HomePageBlockComponent } from "./home-page/home-page-block.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { HomePageComponent } from "./home-page/home-page.component";

@NgModule({
    declarations: [
        HomePageBlockComponent,
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

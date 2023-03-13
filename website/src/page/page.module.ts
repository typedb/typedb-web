import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameworkModule } from "../framework/framework.module";
import { ContentBlockComponent } from "./content-block/content-block.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { GenericPageComponent } from "./generic-page/generic-page.component";

@NgModule({
    declarations: [
        ContentBlockComponent,
        GenericPageComponent,
        NotFoundPageComponent,
    ],
    imports: [
        BrowserModule,
        FrameworkModule,
    ],
    providers: [],
})
export class PageModule { }

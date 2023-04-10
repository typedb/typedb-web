import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { SpinningWheelComponent } from "./spinning-wheel/spinning-wheel.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ModalComponent } from "./modal/modal.component";
import { HttpClientModule } from "@angular/common/http";
import { TechnicolorBlockComponent } from "./technicolor-block/technicolor-block.component";

@NgModule({
    declarations: [
        ModalComponent,
        SpinningWheelComponent,
        TechnicolorBlockComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
    ],
    exports: [
        TechnicolorBlockComponent,
    ],
    providers: [
    ],
})
export class FrameworkModule { }

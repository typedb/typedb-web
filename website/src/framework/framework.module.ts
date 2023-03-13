import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { SpinningWheelComponent } from "./spinning-wheel/spinning-wheel.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ModalComponent } from "./modal/modal.component";
import { HttpClientModule } from "@angular/common/http";
import { TechnicolorBlockChainComponent } from "./technicolor-block-chain/technicolor-block-chain.component";

@NgModule({
    declarations: [
        ModalComponent,
        SpinningWheelComponent,
        TechnicolorBlockChainComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
    ],
    exports: [
        TechnicolorBlockChainComponent,
    ],
    providers: [
    ],
})
export class FrameworkModule { }

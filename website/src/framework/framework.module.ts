import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ActionsComponent } from "./actions/actions.component";
import { ButtonComponent } from "./button/button.component";
import { KeyPointPanels3x1Component, KeyPointTableComponent } from "./key-point/key-point.component";
import { LinkDirective } from "./link/link.directive";
import { SocialMediaPanelsComponent } from "./social-media/social-media-panels.component";
import { SpinningWheelComponent } from "./spinning-wheel/spinning-wheel.component";
import { ModalComponent } from "./modal/modal.component";
import { TechnicolorBlockComponent } from "./technicolor-block/technicolor-block.component";
import { TestimonialsCarouselComponent } from "./testimonials-carousel/testimonials-carousel.component";
import { RichTextComponent } from "./text/rich-text.component";
import { H1WithHighlightsComponent, ParagraphWithHighlightsComponent } from "./text/text-with-highlights.component";

@NgModule({
    declarations: [
        ActionsComponent,
        ButtonComponent,
        H1WithHighlightsComponent,
        LinkDirective,
        KeyPointPanels3x1Component,
        KeyPointTableComponent,
        ModalComponent,
        ParagraphWithHighlightsComponent,
        RichTextComponent,
        SocialMediaPanelsComponent,
        SpinningWheelComponent,
        TechnicolorBlockComponent,
        TestimonialsCarouselComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        MatButtonModule,
    ],
    exports: [
        ActionsComponent,
        ButtonComponent,
        H1WithHighlightsComponent,
        KeyPointPanels3x1Component,
        KeyPointTableComponent,
        LinkDirective,
        ParagraphWithHighlightsComponent,
        SocialMediaPanelsComponent,
        RichTextComponent,
        TechnicolorBlockComponent,
        TestimonialsCarouselComponent,
    ],
    providers: [
    ],
})
export class FrameworkModule { }

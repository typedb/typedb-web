import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { KeyPointPanels3x1Component, KeyPointTableComponent } from "./key-point/key-point.component";
import { LinkDirective } from "./link/link.directive";
import { SocialMediaPanelsComponent } from "./social-media/social-media-panels.component";
import { SpinningWheelComponent } from "./spinning-wheel/spinning-wheel.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ModalComponent } from "./modal/modal.component";
import { HttpClientModule } from "@angular/common/http";
import { TechnicolorBlockComponent } from "./technicolor-block/technicolor-block.component";
import { TestimonialsCarouselComponent } from "./testimonials-carousel/testimonials-carousel.component";
import { RichTextComponent } from "./text/rich-text.component";
import { H1WithHighlightsComponent, ParagraphWithHighlightsComponent } from "./text/text-with-highlights.component";

@NgModule({
    declarations: [
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
    ],
    exports: [
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

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ActionsComponent } from "./actions/actions.component";
import { ButtonComponent } from "./button/button.component";
import { ContentPanelGridComponent } from "./content-panel-grid/content-panel-grid.component";
import { ContentPanelComponent } from "./content-panel/content-panel.component";
import { ContentTabsComponent } from "./content-tabs/content-tabs.component";
import { CloudWaitlistDialogComponent, ContactDialogComponent, NameEmailDialogComponent, NewsletterDialogComponent } from "./dialog/dialog.component";
import { KeyPointPanels3x1Component, KeyPointTableComponent } from "./key-point/key-point.component";
import { LinkDirective } from "./link/link.directive";
import { OrganisationLogosComponent } from "./organisation-logos/organisation-logos.component";
import { TitleBodyActionsSectionComponent } from "./section/title-body-actions-section.component";
import { SocialMediaPanelsComponent } from "./social-media/social-media-panels.component";
import { SpinningWheelComponent } from "./spinning-wheel/spinning-wheel.component";
import { TechnicolorBlockComponent } from "./technicolor-block/technicolor-block.component";
import { TestimonialsCarouselComponent } from "./testimonials-carousel/testimonials-carousel.component";
import { RichTextComponent } from "./text/rich-text.component";
import { H1WithHighlightsComponent, ParagraphWithHighlightsComponent } from "./text/text-with-highlights.component";

@NgModule({
    declarations: [
        ActionsComponent,
        ButtonComponent,
        CloudWaitlistDialogComponent,
        ContactDialogComponent,
        ContentPanelComponent,
        ContentPanelGridComponent,
        ContentTabsComponent,
        H1WithHighlightsComponent,
        LinkDirective,
        KeyPointPanels3x1Component,
        KeyPointTableComponent,
        NameEmailDialogComponent,
        NewsletterDialogComponent,
        OrganisationLogosComponent,
        ParagraphWithHighlightsComponent,
        RichTextComponent,
        SocialMediaPanelsComponent,
        SpinningWheelComponent,
        TechnicolorBlockComponent,
        TestimonialsCarouselComponent,
        TitleBodyActionsSectionComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [
        ActionsComponent,
        ButtonComponent,
        ContentPanelComponent,
        ContentPanelGridComponent,
        ContentTabsComponent,
        H1WithHighlightsComponent,
        KeyPointPanels3x1Component,
        KeyPointTableComponent,
        LinkDirective,
        OrganisationLogosComponent,
        ParagraphWithHighlightsComponent,
        SocialMediaPanelsComponent,
        RichTextComponent,
        TechnicolorBlockComponent,
        TestimonialsCarouselComponent,
        TitleBodyActionsSectionComponent,
    ],
    providers: [
    ],
})
export class FrameworkModule { }

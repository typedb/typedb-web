import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ActionsComponent } from "./actions/actions.component";
import { ButtonComponent } from "./button/button.component";
import { CodeSnippetComponent } from "./code/code-snippet.component";
import { ConclusionPanelComponent } from "./conclusion-panel/conclusion-panel.component";
import { ContentPanelGridComponent } from "./content-panel-grid/content-panel-grid.component";
import { ContentPanelComponent } from "./content-panel/content-panel.component";
import { ContentTabsComponent } from "./content-tabs/content-tabs.component";
import { OrdinalDatePipe } from "./date/ordinal-date.pipe";
import { CloudWaitlistDialogComponent, ContactDialogComponent, DialogCloseButtonComponent, NameEmailDialogComponent, NewsletterDialogComponent } from "./form/dialog.component";
import { OptionDirective } from "./form/option.directive";
import { FeatureTableCellComponent, FeatureTableComponent } from "./feature-table/feature-table.component";
import { GraphVisualisationComponent } from "./graph-visualisation/graph-visualisation.component";
import { CaptionedIllustrationComponent, IllustrationComponent, SplitPaneIllustrationComponent } from "./illustration/illustration.component";
import { InfoButtonComponent } from "./info-button/info-button.component";
import { KeyPointPanels2x2Component, KeyPointTableComponent } from "./key-point/key-point.component";
import { LinkPanelsComponent, WebinarPanelsComponent } from "./link-panels/link-panels.component";
import { LinkDirective } from "./link/link.directive";
import { OrganisationLogosComponent } from "./organisation-logos/organisation-logos.component";
import { ProductTableComponent } from "./product-table/product-table.component";
import { TitleBodyActionsSectionComponent } from "./section/title-body-actions-section.component";
import { SocialMediaPanelsComponent } from "./social-media/social-media-panels.component";
import { TechnicolorBlockComponent } from "./technicolor-block/technicolor-block.component";
import { TestimonialsCarouselComponent } from "./testimonials-carousel/testimonials-carousel.component";
import { PlainTextPipe } from "./text/plain-text.pipe";
import { RichTextComponent } from "./text/rich-text.component";
import { H1WithHighlightsComponent, ParagraphWithHighlightsComponent } from "./text/text-with-highlights.component";
import { RouterModule } from "@angular/router";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TooltipComponent } from "./tooltip/tooltip.component";

@NgModule({
    declarations: [
        ActionsComponent,
        ButtonComponent,
        CaptionedIllustrationComponent,
        CloudWaitlistDialogComponent,
        CodeSnippetComponent,
        ConclusionPanelComponent,
        ContactDialogComponent,
        ContentPanelComponent,
        ContentPanelGridComponent,
        ContentTabsComponent,
        DialogCloseButtonComponent,
        FeatureTableComponent,
        FeatureTableCellComponent,
        GraphVisualisationComponent,
        H1WithHighlightsComponent,
        IllustrationComponent,
        InfoButtonComponent,
        LinkDirective,
        LinkPanelsComponent,
        KeyPointPanels2x2Component,
        KeyPointTableComponent,
        NameEmailDialogComponent,
        NewsletterDialogComponent,
        OptionDirective,
        OrdinalDatePipe,
        OrganisationLogosComponent,
        ParagraphWithHighlightsComponent,
        PlainTextPipe,
        ProductTableComponent,
        RichTextComponent,
        SocialMediaPanelsComponent,
        SplitPaneIllustrationComponent,
        TechnicolorBlockComponent,
        TestimonialsCarouselComponent,
        TitleBodyActionsSectionComponent,
        TooltipComponent,
        WebinarPanelsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        RouterModule,
    ],
    exports: [
        ActionsComponent,
        ButtonComponent,
        CaptionedIllustrationComponent,
        ConclusionPanelComponent,
        ContentPanelComponent,
        ContentPanelGridComponent,
        ContentTabsComponent,
        FeatureTableComponent,
        H1WithHighlightsComponent,
        IllustrationComponent,
        KeyPointPanels2x2Component,
        KeyPointTableComponent,
        LinkDirective,
        LinkPanelsComponent,
        OrdinalDatePipe,
        OrganisationLogosComponent,
        ParagraphWithHighlightsComponent,
        PlainTextPipe,
        ProductTableComponent,
        SocialMediaPanelsComponent,
        RichTextComponent,
        TechnicolorBlockComponent,
        TestimonialsCarouselComponent,
        TitleBodyActionsSectionComponent,
        TooltipComponent,
        WebinarPanelsComponent,
    ],
    providers: [
        PlainTextPipe,
    ],
})
export class FrameworkModule { }

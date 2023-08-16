import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { ActionsComponent } from "./actions/actions.component";
import { ButtonComponent } from "./button/button.component";
import { CodeSnippetComponent } from "./code/code-snippet.component";
import { ConclusionPanelComponent } from "./conclusion-panel/conclusion-panel.component";
import { ContentPanelComponent } from "./content-panel/content-panel.component";
import { ContentTabsComponent } from "./content-tabs/content-tabs.component";
import { OrdinalDatePipe } from "./date/ordinal-date.pipe";
import {
    CloudWaitlistDialogComponent,
    ContactDialogComponent,
    DialogCloseButtonComponent,
    NameEmailDialogComponent,
    NewsletterDialogComponent,
} from "./form/dialog.component";
import { OptionDirective } from "./form/option.directive";
import { FeatureTableCellComponent, FeatureTableComponent } from "./feature-table/feature-table.component";
import { GraphVisualisationComponent } from "./graph-visualisation/graph-visualisation.component";
import {
    CaptionedIllustrationComponent,
    IllustrationComponent,
    SplitPaneIllustrationComponent,
} from "./illustration/illustration.component";
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
import { ParagraphWithHighlightsPipe } from "./text/paragraph-with-highlights.pipe";
import { PlainTextPipe } from "./text/plain-text.pipe";
import { RichTextComponent } from "./text/rich-text.component";
import { RichTextPipe } from "./text/rich-text.pipe";
import { H1WithHighlightsComponent, ParagraphWithHighlightsComponent } from "./text/text-with-highlights.component";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { PageBackgroundComponent } from "./page-background/page-background.component";
import { AspectRatioComponent } from "./aspect-ratio/aspect-ratio.component";
import { ScrollShadowComponent } from "./scroll-shadow/scroll-shadow.component";
import { PersonInfoComponent } from "./person-info/person-info.component";
import { EventDurationPipe } from "./date/event-duration.pipe";
import { DateRangePipe } from "./date/date-range.pipe";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { ServiceTableComponent } from "./service-table/service-table.component";
import { ContactPanelComponent } from "./contact-panel/contact-panel.component";

const globalRippleConfig: RippleGlobalOptions = {
    disabled: true,
};

@NgModule({
    declarations: [
        ActionsComponent,
        AspectRatioComponent,
        ButtonComponent,
        CaptionedIllustrationComponent,
        CloudWaitlistDialogComponent,
        CodeSnippetComponent,
        ConclusionPanelComponent,
        ContactDialogComponent,
        ContactPanelComponent,
        ContentPanelComponent,
        ContentTabsComponent,
        DateRangePipe,
        DialogCloseButtonComponent,
        EventDurationPipe,
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
        PageBackgroundComponent,
        ParagraphWithHighlightsComponent,
        ParagraphWithHighlightsPipe,
        PersonInfoComponent,
        PlainTextPipe,
        ProductTableComponent,
        RichTextComponent,
        RichTextPipe,
        ScrollShadowComponent,
        ServiceTableComponent,
        SnackbarComponent,
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
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        RouterModule,
    ],
    exports: [
        ActionsComponent,
        AspectRatioComponent,
        ButtonComponent,
        CaptionedIllustrationComponent,
        ConclusionPanelComponent,
        ContactPanelComponent,
        ContentPanelComponent,
        ContentTabsComponent,
        DateRangePipe,
        EventDurationPipe,
        FeatureTableComponent,
        H1WithHighlightsComponent,
        IllustrationComponent,
        KeyPointPanels2x2Component,
        KeyPointTableComponent,
        LinkDirective,
        LinkPanelsComponent,
        MatButtonModule,
        MatIconModule,
        OrdinalDatePipe,
        OrganisationLogosComponent,
        PageBackgroundComponent,
        ParagraphWithHighlightsComponent,
        ParagraphWithHighlightsPipe,
        PersonInfoComponent,
        PlainTextPipe,
        ProductTableComponent,
        ServiceTableComponent,
        SocialMediaPanelsComponent,
        RichTextComponent,
        RichTextPipe,
        TechnicolorBlockComponent,
        TestimonialsCarouselComponent,
        TitleBodyActionsSectionComponent,
        TooltipComponent,
        WebinarPanelsComponent,
    ],
    providers: [PlainTextPipe, { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig }],
})
export class FrameworkModule {}

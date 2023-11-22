import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { ActionsComponent } from "./actions/actions.component";
import { AspectRatioComponent } from "./aspect-ratio/aspect-ratio.component";
import { ButtonComponent } from "./button/button.component";
import { CodeSnippetComponent, PolyglotSnippetComponent } from "./code/code-snippet.component";
import { ConclusionPanelComponent } from "./conclusion-panel/conclusion-panel.component";
import { ContactPanelComponent } from "./contact-panel/contact-panel.component";
import { ContentPanelComponent } from "./content-panel/content-panel.component";
import { ContentTabsComponent } from "./content-tabs/content-tabs.component";
import { EventDatePipe } from "./date/event-date.pipe";
import { EventDurationPipe } from "./date/event-duration.pipe";
import { OrdinalDatePipe } from "./date/ordinal-date.pipe";
import { FeatureGridComponent } from "./feature-grid/feature-grid.component";
import { TagChipsComponent } from "./feature-grid/tag-chips.component";
import { FeatureTableCellComponent, FeatureTableComponent } from "./feature-table/feature-table.component";
import {
    CloudWaitlistDialogComponent,
    ContactDialogComponent,
    DialogCloseButtonComponent,
    DialogComponent,
    FeedbackDialogComponent,
    NewsletterDialogComponent,
} from "./form/dialog.component";
import { OptionDirective } from "./form/option.directive";
import { FurtherLearningComponent } from "./further-learning/further-learning.component";
import { GraphVisualisationComponent } from "./graph-visualisation/graph-visualisation.component";
import {
    CaptionedIllustrationComponent,
    IllustrationComponent,
    SplitPaneIllustrationComponent,
} from "./illustration/illustration.component";
import { InfoButtonComponent } from "./info-button/info-button.component";
import { KeyPointPanels2x2Component, KeyPointTableComponent } from "./key-point/key-point.component";
import {
    LecturePanelsComponent,
    LinkPanelsCols2Component,
    LinkPanelsComponent,
    ResourcePanelsComponent,
} from "./link-panels/link-panels.component";
import { LinkDirective } from "./link/link.directive";
import { OrganisationLogosComponent } from "./organisation-logos/organisation-logos.component";
import { PageBackgroundComponent } from "./page-background/page-background.component";
import { AvatarComponent, PersonCardComponent, PersonInfoComponent } from "./person/person.component";
import { ProductTableComponent } from "./product-table/product-table.component";
import { PublicationPanelComponent } from "./publication-panel/publication-panel.component";
import { ScrollShadowComponent } from "./scroll-shadow/scroll-shadow.component";
import { TitleBodyActionsSectionComponent } from "./section/title-body-actions-section.component";
import { ServicesTableComponent } from "./services-table/services-table.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { SocialMediaPanelsComponent } from "./social-media/social-media-panels.component";
import { TechnicolorBlockComponent } from "./technicolor-block/technicolor-block.component";
import { TestimonialsCarouselComponent } from "./testimonials-carousel/testimonials-carousel.component";
import { HtmlPipe } from "./text/html.pipe";
import { ParagraphWithHighlightsPipe } from "./text/paragraph-with-highlights.pipe";
import { PlainTextPipe } from "./text/plain-text.pipe";
import { RichTextComponent } from "./text/rich-text.component";
import {
    HeadingWithHighlightsComponent,
    ParagraphWithHighlightsComponent,
} from "./text/text-with-highlights.component";
import { TooltipComponent } from "./tooltip/tooltip.component";

const globalRippleConfig: RippleGlobalOptions = {
    disabled: true,
};

@NgModule({
    declarations: [
        ActionsComponent,
        AspectRatioComponent,
        AvatarComponent,
        ButtonComponent,
        CaptionedIllustrationComponent,
        CloudWaitlistDialogComponent,
        CodeSnippetComponent,
        ConclusionPanelComponent,
        ContactDialogComponent,
        ContactPanelComponent,
        ContentPanelComponent,
        ContentTabsComponent,
        DialogCloseButtonComponent,
        DialogComponent,
        EventDatePipe,
        EventDurationPipe,
        FeatureGridComponent,
        FeatureTableComponent,
        FeatureTableCellComponent,
        FeedbackDialogComponent,
        FurtherLearningComponent,
        GraphVisualisationComponent,
        HeadingWithHighlightsComponent,
        HtmlPipe,
        IllustrationComponent,
        InfoButtonComponent,
        LinkDirective,
        LinkPanelsCols2Component,
        LinkPanelsComponent,
        KeyPointPanels2x2Component,
        KeyPointTableComponent,
        NewsletterDialogComponent,
        OptionDirective,
        OrdinalDatePipe,
        OrganisationLogosComponent,
        PageBackgroundComponent,
        ParagraphWithHighlightsComponent,
        ParagraphWithHighlightsPipe,
        PersonCardComponent,
        PersonInfoComponent,
        PlainTextPipe,
        PolyglotSnippetComponent,
        ProductTableComponent,
        PublicationPanelComponent,
        ResourcePanelsComponent,
        RichTextComponent,
        ScrollShadowComponent,
        ServicesTableComponent,
        SnackbarComponent,
        SocialMediaPanelsComponent,
        SplitPaneIllustrationComponent,
        TagChipsComponent,
        TechnicolorBlockComponent,
        TestimonialsCarouselComponent,
        TitleBodyActionsSectionComponent,
        TooltipComponent,
        LecturePanelsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatProgressBarModule,
        MatSnackBarModule,
        RouterModule,
    ],
    exports: [
        ActionsComponent,
        AspectRatioComponent,
        AvatarComponent,
        ButtonComponent,
        CaptionedIllustrationComponent,
        ConclusionPanelComponent,
        ContactPanelComponent,
        ContentPanelComponent,
        ContentTabsComponent,
        EventDatePipe,
        EventDurationPipe,
        FeatureGridComponent,
        FeatureTableComponent,
        FurtherLearningComponent,
        HeadingWithHighlightsComponent,
        HtmlPipe,
        IllustrationComponent,
        KeyPointPanels2x2Component,
        KeyPointTableComponent,
        LinkDirective,
        LinkPanelsCols2Component,
        LinkPanelsComponent,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        OrdinalDatePipe,
        OrganisationLogosComponent,
        PageBackgroundComponent,
        ParagraphWithHighlightsComponent,
        ParagraphWithHighlightsPipe,
        PersonCardComponent,
        PersonInfoComponent,
        PlainTextPipe,
        PolyglotSnippetComponent,
        ProductTableComponent,
        PublicationPanelComponent,
        RichTextComponent,
        ServicesTableComponent,
        SocialMediaPanelsComponent,
        TechnicolorBlockComponent,
        TestimonialsCarouselComponent,
        TitleBodyActionsSectionComponent,
        TooltipComponent,
        LecturePanelsComponent,
        ScrollShadowComponent,
        ResourcePanelsComponent,
    ],
    providers: [HtmlPipe, PlainTextPipe, { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig }],
})
export class FrameworkModule {}

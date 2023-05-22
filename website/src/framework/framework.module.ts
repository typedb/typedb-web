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
import { CloudWaitlistDialogComponent, ContactDialogComponent, NameEmailDialogComponent, NewsletterDialogComponent } from "./dialog/dialog.component";
import { OptionDirective } from "./dialog/option.directive";
import { GraphVisualisationComponent } from "./graph/graph-visualisation.component";
import { IllustrationComponent, SplitPaneIllustrationComponent } from "./illustration/illustration.component";
import { KeyPointPanels2x2Component, KeyPointTableComponent } from "./key-point/key-point.component";
import { LinkPanelsComponent } from "./link-panels/link-panels.component";
import { LinkDirective } from "./link/link.directive";
import { OrganisationLogosComponent } from "./organisation-logos/organisation-logos.component";
import { TitleBodyActionsSectionComponent } from "./section/title-body-actions-section.component";
import { SocialMediaPanelsComponent } from "./social-media/social-media-panels.component";
import { TechnicolorBlockComponent } from "./technicolor-block/technicolor-block.component";
import { TestimonialsCarouselComponent } from "./testimonials-carousel/testimonials-carousel.component";
import { RichTextComponent } from "./text/rich-text.component";
import { H1WithHighlightsComponent, ParagraphWithHighlightsComponent } from "./text/text-with-highlights.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        ActionsComponent,
        ButtonComponent,
        CloudWaitlistDialogComponent,
        CodeSnippetComponent,
        ConclusionPanelComponent,
        ContactDialogComponent,
        ContentPanelComponent,
        ContentPanelGridComponent,
        ContentTabsComponent,
        GraphVisualisationComponent,
        H1WithHighlightsComponent,
        IllustrationComponent,
        LinkDirective,
        LinkPanelsComponent,
        KeyPointPanels2x2Component,
        KeyPointTableComponent,
        NameEmailDialogComponent,
        NewsletterDialogComponent,
        OptionDirective,
        OrganisationLogosComponent,
        ParagraphWithHighlightsComponent,
        RichTextComponent,
        SocialMediaPanelsComponent,
        SplitPaneIllustrationComponent,
        TechnicolorBlockComponent,
        TestimonialsCarouselComponent,
        TitleBodyActionsSectionComponent,
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
        RouterModule,
    ],
    exports: [
        ActionsComponent,
        ButtonComponent,
        ConclusionPanelComponent,
        ContentPanelComponent,
        ContentPanelGridComponent,
        ContentTabsComponent,
        H1WithHighlightsComponent,
        IllustrationComponent,
        KeyPointPanels2x2Component,
        KeyPointTableComponent,
        LinkDirective,
        LinkPanelsComponent,
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

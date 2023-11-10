import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { FrameworkModule } from "../framework/framework.module";
import { _404PageComponent } from "./404/404-page.component";
import { BlogAuthorshipBarComponent } from "./blog/blog-authorship-bar.component";
import { BlogCategoryChipsComponent } from "./blog/blog-category-chips.component";
import { BlogNavbarComponent } from "./blog/blog-navbar.component";
import { BlogPostPageComponent } from "./blog/blog-post-page.component";
import { BlogRowComponent } from "./blog/blog-row.component";
import { BlogComponent } from "./blog/blog.component";
import {
    DeploymentPageComponent,
    DeploymentPageTechnicolorBlockComponent,
} from "./deployment/deployment-page.component";
import { EventDetailsPageComponent } from "./events/event-details-page.component";
import { EventsPageComponent } from "./events/events-page.component";
import { FallbackPageComponent } from "./fallback/fallback-page.component";
import { FeaturesPageComponent, FeaturesPageTechnicolorBlockComponent } from "./features/features-page.component";
import { GenericPageComponent, GenericPageTechnicolorBlockComponent } from "./generic/generic-page.component";
import { HomePageComponent, HomePageTechnicolorBlockComponent } from "./home/home-page.component";
import { LearningArticleComponent } from "./learning-center/learning-article.component";
import { LearningCenterBlockComponent, LearningCenterComponent } from "./learning-center/learning-center.component";
import { LectureDetailsPageComponent } from "./lectures/lecture-details-page.component";
import { LecturesPageComponent } from "./lectures/lectures-page.component";
import {
    PhilosophyPageComponent,
    PhilosophyPageTechnicolorBlockComponent,
} from "./philosophy/philosophy-page.component";
import { PrivacyPolicyPageComponent } from "./privacy-policy/privacy-policy-page.component";
import { ServicesPageComponent, ServicesPageTechnicolorBlockComponent } from "./services/services-page.component";
import { SupportPageComponent, SupportPageTechnicolorBlockComponent } from "./support/support-page.component";
import { RequestTechTalkPageComponent } from "./tech-talk/request-tech-talk-page.component";
import { WhitePaperDetailsPageComponent } from "./white-papers/white-paper-details-page.component";
import { WhitePapersPageComponent } from "./white-papers/white-papers-page.component";

@NgModule({
    declarations: [
        BlogAuthorshipBarComponent,
        BlogCategoryChipsComponent,
        BlogComponent,
        BlogNavbarComponent,
        BlogPostPageComponent,
        BlogRowComponent,
        DeploymentPageComponent,
        DeploymentPageTechnicolorBlockComponent,
        EventDetailsPageComponent,
        EventsPageComponent,
        GenericPageComponent,
        GenericPageTechnicolorBlockComponent,
        FallbackPageComponent,
        FeaturesPageComponent,
        FeaturesPageTechnicolorBlockComponent,
        HomePageComponent,
        HomePageTechnicolorBlockComponent,
        LearningArticleComponent,
        LearningCenterComponent,
        LearningCenterBlockComponent,
        LectureDetailsPageComponent,
        LecturesPageComponent,
        PhilosophyPageComponent,
        PhilosophyPageTechnicolorBlockComponent,
        _404PageComponent,
        PrivacyPolicyPageComponent,
        RequestTechTalkPageComponent,
        ServicesPageComponent,
        ServicesPageTechnicolorBlockComponent,
        SupportPageComponent,
        SupportPageTechnicolorBlockComponent,
        WhitePaperDetailsPageComponent,
        WhitePapersPageComponent,
    ],
    imports: [BrowserModule, CommonModule, FormsModule, FrameworkModule],
    providers: [],
})
export class PageModule {}

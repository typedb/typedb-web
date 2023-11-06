import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { FrameworkModule } from "../framework/framework.module";
import { BlogAuthorshipBarComponent } from "./blog/blog-authorship-bar.component";
import { BlogCategoryChipsComponent } from "./blog/blog-category-chips.component";
import { BlogNavbarComponent } from "./blog/blog-navbar.component";
import { BlogPostPageComponent } from "./blog/blog-post-page.component";
import { BlogRowComponent } from "./blog/blog-row.component";
import { BlogComponent } from "./blog/blog.component";
import {
    DeploymentPageComponent,
    DeploymentPageTechnicolorBlockComponent,
} from "./deployment-page/deployment-page.component";
import { EventDetailsPageComponent } from "./event-details-page/event-details-page.component";
import { EventsPageComponent } from "./events-page/events-page.component";
import { FallbackPageComponent } from "./fallback-page/fallback-page.component";
import { FeaturesPageComponent, FeaturesPageTechnicolorBlockComponent } from "./features-page/features-page.component";
import { GenericPageComponent, GenericPageTechnicolorBlockComponent } from "./generic-page/generic-page.component";
import { HomePageComponent, HomePageTechnicolorBlockComponent } from "./home-page/home-page.component";
import { LearningArticleComponent } from "./learning-center/learning-article.component";
import { LearningCenterBlockComponent, LearningCenterComponent } from "./learning-center/learning-center.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import {
    PhilosophyPageComponent,
    PhilosophyPageTechnicolorBlockComponent,
} from "./philosophy-page/philosophy-page.component";
import { PrivacyPolicyPageComponent } from "./privacy-policy-page/privacy-policy-page.component";
import { RequestTechTalkPageComponent } from "./request-tech-talk-page/request-tech-talk-page.component";
import { ServicesPageComponent, ServicesPageTechnicolorBlockComponent } from "./services-page/services-page.component";
import { SolutionPageComponent, SolutionPageTechnicolorBlockComponent } from "./solution-page/solution-page.component";
import { SupportPageComponent, SupportPageTechnicolorBlockComponent } from "./support-page/support-page.component";
import { WebinarDetailsPageComponent } from "./webinar-details-page/webinar-details-page.component";
import { WebinarsPageComponent } from "./webinars-page/webinars-page.component";
import { WhitePaperDetailsPageComponent } from "./white-paper-details-page/white-paper-details-page.component";
import { WhitePapersPageComponent } from "./white-papers-page/white-papers-page.component";

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
        PhilosophyPageComponent,
        PhilosophyPageTechnicolorBlockComponent,
        NotFoundPageComponent,
        PrivacyPolicyPageComponent,
        RequestTechTalkPageComponent,
        ServicesPageComponent,
        ServicesPageTechnicolorBlockComponent,
        SolutionPageComponent,
        SolutionPageTechnicolorBlockComponent,
        SupportPageComponent,
        SupportPageTechnicolorBlockComponent,
        WebinarDetailsPageComponent,
        WebinarsPageComponent,
        WhitePaperDetailsPageComponent,
        WhitePapersPageComponent,
    ],
    imports: [BrowserModule, CommonModule, FormsModule, FrameworkModule],
    providers: [],
})
export class PageModule {}

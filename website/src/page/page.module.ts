import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FrameworkModule } from "../framework/framework.module";
import { BlogLandingPageComponent } from "./blog-landing-page/blog-landing-page.component";
import { BlogPostPageComponent } from "./blog-post-page/blog-post-page.component";
import {
    DeploymentPageComponent,
    DeploymentPageTechnicolorBlockComponent,
} from "./deployment-page/deployment-page.component";
import { GenericPageComponent, GenericPageTechnicolorBlockComponent } from "./generic-page/generic-page.component";
import { FeaturesPageComponent, FeaturesPageTechnicolorBlockComponent } from "./features-page/features-page.component";
import { IntroPageComponent, IntroPageTechnicolorBlockComponent } from "./intro-page/intro-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { HomePageTechnicolorBlockComponent, HomePageComponent } from "./home-page/home-page.component";
import { PrivacyPolicyPageComponent } from "./privacy-policy-page/privacy-policy-page.component";
import { SolutionPageComponent, SolutionPageTechnicolorBlockComponent } from "./solution-page/solution-page.component";
import { EventDurationPipe } from "./webinar-details-page/event-duration.pipe";
import { WebinarDetailsPageComponent } from "./webinar-details-page/webinar-details-page.component";
import { WebinarsPageComponent } from "./webinars-page/webinars-page.component";
import { CommonModule } from "@angular/common";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { FormsModule } from "@angular/forms";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { WhitePaperDetailsPageComponent } from "./white-paper-details-page/white-paper-details-page.component";
import { WhitePapersPageComponent } from "./white-papers-page/white-papers-page.component";
import { RequestTechTalkPageComponent } from "./request-tech-talk-page/request-tech-talk-page.component";

@NgModule({
    declarations: [
        BlogLandingPageComponent,
        BlogPostPageComponent,
        DeploymentPageComponent,
        DeploymentPageTechnicolorBlockComponent,
        EventDurationPipe,
        GenericPageComponent,
        GenericPageTechnicolorBlockComponent,
        FeaturesPageComponent,
        FeaturesPageTechnicolorBlockComponent,
        HomePageComponent,
        HomePageTechnicolorBlockComponent,
        IntroPageComponent,
        IntroPageTechnicolorBlockComponent,
        NotFoundPageComponent,
        PrivacyPolicyPageComponent,
        RequestTechTalkPageComponent,
        SolutionPageComponent,
        SolutionPageTechnicolorBlockComponent,
        WebinarDetailsPageComponent,
        WebinarsPageComponent,
        WhitePaperDetailsPageComponent,
        WhitePapersPageComponent,
    ],
    imports: [BrowserModule, CommonModule, FormsModule, FrameworkModule, MatFormFieldModule, MatInputModule],
    providers: [],
})
export class PageModule {}

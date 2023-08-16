import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { FrameworkModule } from "../framework/framework.module";
import {
    DeploymentPageComponent,
    DeploymentPageTechnicolorBlockComponent,
} from "./deployment-page/deployment-page.component";
import { EventDetailsPageComponent } from "./event-details-page/event-details-page.component";
import { EventsPageComponent } from "./events-page/events-page.component";
import { FeaturesPageComponent, FeaturesPageTechnicolorBlockComponent } from "./features-page/features-page.component";
import { GenericPageComponent, GenericPageTechnicolorBlockComponent } from "./generic-page/generic-page.component";
import { HomePageTechnicolorBlockComponent, HomePageComponent } from "./home-page/home-page.component";
import { IntroPageComponent, IntroPageTechnicolorBlockComponent } from "./intro-page/intro-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { PrivacyPolicyPageComponent } from "./privacy-policy-page/privacy-policy-page.component";
import { RequestTechTalkPageComponent } from "./request-tech-talk-page/request-tech-talk-page.component";
import { ServicePageComponent, ServicePageTechnicolorBlockComponent } from "./service-page/service-page.component";
import { SolutionPageComponent, SolutionPageTechnicolorBlockComponent } from "./solution-page/solution-page.component";
import { SupportPageComponent, SupportPageTechnicolorBlockComponent } from "./support-page/support-page.component";
import { WebinarDetailsPageComponent } from "./webinar-details-page/webinar-details-page.component";
import { WebinarsPageComponent } from "./webinars-page/webinars-page.component";
import { WhitePaperDetailsPageComponent } from "./white-paper-details-page/white-paper-details-page.component";
import { WhitePapersPageComponent } from "./white-papers-page/white-papers-page.component";

@NgModule({
    declarations: [
        DeploymentPageComponent,
        DeploymentPageTechnicolorBlockComponent,
        EventDetailsPageComponent,
        EventsPageComponent,
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
        ServicePageComponent,
        ServicePageTechnicolorBlockComponent,
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

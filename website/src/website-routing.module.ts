import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlogLandingPageComponent } from "./page/blog-landing-page/blog-landing-page.component";
import { DeploymentPageComponent } from "./page/deployment-page/deployment-page.component";
import { GenericPageComponent } from "./page/generic-page/generic-page.component";
import { FeaturesPageComponent } from "./page/features-page/features-page.component";
import { HomePageComponent } from "./page/home-page/home-page.component";
import { IntroPageComponent } from "./page/intro-page/intro-page.component";
import { NotFoundPageComponent } from "./page/not-found-page/not-found-page.component";
import { PrivacyPolicyPageComponent } from "./page/privacy-policy-page/privacy-policy-page.component";
import { SolutionPageComponent } from "./page/solution-page/solution-page.component";
import { WebinarDetailsPageComponent } from "./page/webinar-details-page/webinar-details-page.component";
import { WebinarsPageComponent } from "./page/webinars-page/webinars-page.component";
import { WhitePaperDetailsPageComponent } from "./page/white-paper-details-page/white-paper-details-page.component";
import { WhitePapersPageComponent } from "./page/white-papers-page/white-papers-page.component";
import { RequestTechTalkPageComponent } from "./page/request-tech-talk-page/request-tech-talk-page.component";

const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "introduction", component: IntroPageComponent },
    { path: "features", component: FeaturesPageComponent },
    { path: "cloud", component: GenericPageComponent, data: { documentID: "cloudPage" } },
    { path: "studio", component: GenericPageComponent, data: { documentID: "studioPage" } },
    { path: "deploy", component: DeploymentPageComponent },
    { path: "solutions/:route", component: SolutionPageComponent },
    { path: "webinars/:slug", component: WebinarDetailsPageComponent },
    { path: "webinars", component: WebinarsPageComponent },
    { path: "white-papers/:slug", component: WhitePaperDetailsPageComponent },
    { path: "white-papers", component: WhitePapersPageComponent },
    { path: "request-tech-talk", component: RequestTechTalkPageComponent },
    { path: "blog", component: BlogLandingPageComponent },
    { path: "privacy-policy", component: PrivacyPolicyPageComponent },
    { path: "**", component: NotFoundPageComponent, title: "404 - TypeDB" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "disabled" })],
    exports: [RouterModule],
})
export class WebsiteRoutingModule {}

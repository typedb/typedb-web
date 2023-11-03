import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BlogPostPageComponent } from "./page/./blog/blog-post-page.component";
import { BlogComponent } from "./page/./blog/blog.component";
import { PhilosophyPageComponent } from "./page/./philosophy-page/philosophy-page.component";
import { DeploymentPageComponent } from "./page/deployment-page/deployment-page.component";
import { EventDetailsPageComponent } from "./page/event-details-page/event-details-page.component";
import { EventsPageComponent } from "./page/events-page/events-page.component";
import { FeaturesPageComponent } from "./page/features-page/features-page.component";
import { GenericPageComponent } from "./page/generic-page/generic-page.component";
import { HomePageComponent } from "./page/home-page/home-page.component";
import { LearningArticleComponent } from "./page/learning-center/learning-article.component";
import { LearningCenterComponent } from "./page/learning-center/learning-center.component";
import { NotFoundPageComponent } from "./page/not-found-page/not-found-page.component";
import { PrivacyPolicyPageComponent } from "./page/privacy-policy-page/privacy-policy-page.component";
import { RequestTechTalkPageComponent } from "./page/request-tech-talk-page/request-tech-talk-page.component";
import { ServicesPageComponent } from "./page/services-page/services-page.component";
import { SolutionPageComponent } from "./page/solution-page/solution-page.component";
import { SupportPageComponent } from "./page/support-page/support-page.component";
import { WebinarDetailsPageComponent } from "./page/webinar-details-page/webinar-details-page.component";
import { WebinarsPageComponent } from "./page/webinars-page/webinars-page.component";
import { WhitePaperDetailsPageComponent } from "./page/white-paper-details-page/white-paper-details-page.component";
import { WhitePapersPageComponent } from "./page/white-papers-page/white-papers-page.component";

const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "features", component: FeaturesPageComponent },
    { path: "philosophy", component: PhilosophyPageComponent },
    { path: "cloud", component: GenericPageComponent, data: { documentID: "cloudPage" } },
    { path: "studio", component: GenericPageComponent, data: { documentID: "studioPage" } },
    { path: "deploy", component: DeploymentPageComponent },
    { path: "learn", component: LearningCenterComponent },
    {
        path: "learn/fundamentals/:slug",
        component: LearningArticleComponent,
        data: { resourceType: "fundamentalArticle" },
    },
    {
        path: "learn/applications/:slug",
        component: LearningArticleComponent,
        data: { resourceType: "applicationArticle" },
    },
    { path: "blog", component: BlogComponent },
    { path: "blog/category/:categorySlug", component: BlogComponent },
    { path: "blog/:slug", component: BlogPostPageComponent },
    { path: "solutions/:route", component: SolutionPageComponent },
    { path: "webinars/:slug", component: WebinarDetailsPageComponent },
    { path: "webinars", component: WebinarsPageComponent },
    { path: "white-papers/:slug", component: WhitePaperDetailsPageComponent },
    { path: "white-papers", component: WhitePapersPageComponent },
    { path: "events/:slug", component: EventDetailsPageComponent },
    { path: "events", component: EventsPageComponent },
    { path: "request-tech-talk", component: RequestTechTalkPageComponent },
    { path: "support", component: SupportPageComponent },
    { path: "privacy-policy", component: PrivacyPolicyPageComponent, title: "TypeDB | Privacy Policy" },

    // TODO: remember to clean up these redirects eventually
    { path: "introduction", redirectTo: "philosophy" },
    { path: "learn/fundamentals", redirectTo: "learn" },
    { path: "learn/applications", redirectTo: "learn" },
    { path: "services", redirectTo: "support" },
    { path: "solutions/:route", redirectTo: "philosophy" },

    { path: "**", component: NotFoundPageComponent, title: "TypeDB | 404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "disabled" })],
    exports: [RouterModule],
})
export class WebsiteRoutingModule {}

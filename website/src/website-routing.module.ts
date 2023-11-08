import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { _404PageComponent } from "./page/404/404-page.component";
import { PrivacyPolicyPageComponent } from "./page/././privacy-policy/privacy-policy-page.component";
import { DeploymentPageComponent } from "./page/./deployment/deployment-page.component";
import { EventsPageComponent } from "./page/./events/events-page.component";
import { FallbackPageComponent } from "./page/./fallback/fallback-page.component";
import { FeaturesPageComponent } from "./page/./features/features-page.component";
import { GenericPageComponent } from "./page/./generic/generic-page.component";
import { HomePageComponent } from "./page/./home/home-page.component";
import { PhilosophyPageComponent } from "./page/./philosophy/philosophy-page.component";
import { SupportPageComponent } from "./page/./support/support-page.component";
import { RequestTechTalkPageComponent } from "./page/./tech-talk/request-tech-talk-page.component";
import { WebinarsPageComponent } from "./page/./webinars/webinars-page.component";
import { WhitePapersPageComponent } from "./page/./white-papers/white-papers-page.component";
import { BlogPostPageComponent } from "./page/blog/blog-post-page.component";
import { BlogComponent } from "./page/blog/blog.component";
import { EventDetailsPageComponent } from "./page/events/event-details-page.component";
import { LearningArticleComponent } from "./page/learning-center/learning-article.component";
import { LearningCenterComponent } from "./page/learning-center/learning-center.component";
import { WebinarDetailsPageComponent } from "./page/webinars/webinar-details-page.component";
import { WhitePaperDetailsPageComponent } from "./page/white-papers/white-paper-details-page.component";

const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "features", component: FeaturesPageComponent },
    { path: "philosophy", component: PhilosophyPageComponent },
    { path: "cloud", component: GenericPageComponent, data: { documentID: "cloudPage" } },
    { path: "studio", component: GenericPageComponent, data: { documentID: "studioPage" } },
    { path: "deploy", component: DeploymentPageComponent },
    { path: "learn", component: LearningCenterComponent },
    {
        path: "fundamentals/:slug",
        component: LearningArticleComponent,
        data: { resourceType: "fundamentalArticle" },
    },
    {
        path: "applications/:slug",
        component: LearningArticleComponent,
        data: { resourceType: "applicationArticle" },
    },
    { path: "blog", component: BlogComponent },
    { path: "blog/category/:categorySlug", component: BlogComponent },
    { path: "blog/:slug", component: BlogPostPageComponent },
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
    { path: "fundamentals", redirectTo: "learn" },
    { path: "applications", redirectTo: "learn" },
    { path: "services", redirectTo: "support" },
    { path: "solutions/:route", redirectTo: "philosophy" },

    { path: "__fallback", component: FallbackPageComponent },
    { path: "**", component: _404PageComponent, title: "TypeDB | 404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "disabled" })],
    exports: [RouterModule],
})
export class WebsiteRoutingModule {}

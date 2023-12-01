import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";

import { _404PageComponent } from "./page/404/404-page.component";
import { BlogPostPageComponent } from "./page/blog/blog-post-page.component";
import { BlogComponent } from "./page/blog/blog.component";
import { DeploymentPageComponent } from "./page/deployment/deployment-page.component";
import { EventDetailsPageComponent } from "./page/events/event-details-page.component";
import { EventsPageComponent } from "./page/events/events-page.component";
import { FallbackPageComponent } from "./page/fallback/fallback-page.component";
import { FeaturesPageComponent } from "./page/features/features-page.component";
import { GenericPageComponent } from "./page/generic/generic-page.component";
import { HomePageComponent } from "./page/home/home-page.component";
import { LearningArticleComponent } from "./page/learning-center/learning-article.component";
import { LearningCenterComponent } from "./page/learning-center/learning-center.component";
import { LectureDetailsPageComponent } from "./page/lectures/lecture-details-page.component";
import { LecturesPageComponent } from "./page/lectures/lectures-page.component";
import { LegalDocumentComponent } from "./page/legal/legal-document.component";
import { PhilosophyPageComponent } from "./page/philosophy/philosophy-page.component";
import { SupportPageComponent } from "./page/support/support-page.component";
import { RequestTechTalkPageComponent } from "./page/tech-talk/request-tech-talk-page.component";
import { dynamicPages, genericPages, staticPages } from "./website-routes";

const staticPageExtra: Record<(typeof staticPages)[number]["path"], Route> = {
    "": { component: HomePageComponent },
    "request-tech-talk": { component: RequestTechTalkPageComponent, title: "TypeDB: Request a Tech Talk" },
    // "white-papers": { component: WhitePapersPageComponent, title: "TypeDB White Papers" },
    blog: { component: BlogComponent, title: "TypeDB Blog" },
    deploy: { component: DeploymentPageComponent, title: "TypeDB Deployments" },
    events: { component: EventsPageComponent, title: "TypeDB Events" },
    features: { component: FeaturesPageComponent },
    learn: { component: LearningCenterComponent, title: "TypeDB Learning Center" },
    lectures: { component: LecturesPageComponent, title: "TypeDB Lectures" },
    philosophy: { component: PhilosophyPageComponent, title: "TypeDB Philosophy" },
    support: { component: SupportPageComponent },
};

const genericPageExtra: Record<(typeof genericPages)[number]["path"], Route> = {
    cloud: { title: "TypeDB Cloud" },
    studio: { title: "TypeDB Studio" },
};

const dynamicPageExtra: Record<(typeof dynamicPages)[number]["path"], Route> = {
    "blog/:slug": { component: BlogPostPageComponent },
    "blog/category/:slug": { component: BlogComponent },
    "events/:slug": { component: EventDetailsPageComponent },
    "lectures/:slug": { component: LectureDetailsPageComponent },
    "legal/:slug": { component: LegalDocumentComponent },
    // "white-papers/:slug": { component: WhitePaperDetailsPageComponent },
    "applications/:slug": { component: LearningArticleComponent, data: { resourceType: "applicationArticle" } },
    "fundamentals/:slug": { component: LearningArticleComponent, data: { resourceType: "fundamentalArticle" } },
};

const routes: Routes = [
    ...staticPages.map(({ path }) => ({
        path,
        ...staticPageExtra[path],
    })),

    ...genericPages.map(({ documentID, path }) => ({
        path,
        component: GenericPageComponent,
        data: { documentID },
        ...genericPageExtra[path],
    })),

    ...dynamicPages.map(({ path }) => ({
        path,
        ...dynamicPageExtra[path],
    })),

    // TODO: remember to clean up these redirects eventually
    { path: "introduction", redirectTo: "philosophy" },
    { path: "fundamentals", redirectTo: "learn" },
    { path: "applications", redirectTo: "learn" },
    { path: "services", redirectTo: "support" },
    { path: "solutions/:route", redirectTo: "philosophy" },
    { path: "webinars/:slug", redirectTo: "lectures/:slug" },
    { path: "webinars", redirectTo: "lectures" },
    { path: "white-papers/:slug", redirectTo: "learn" },
    { path: "white-papers", redirectTo: "learn" },
    { path: "privacy-policy", redirectTo: "legal/privacy-policy" },

    { path: "__fallback", component: FallbackPageComponent },
    { path: "**", component: _404PageComponent, title: "TypeDB: 404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "disabled" })],
    exports: [RouterModule],
})
export class WebsiteRoutingModule {}

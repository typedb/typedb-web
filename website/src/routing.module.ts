import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";

import { _404PageComponent } from "./page/404/404-page.component";
// import { BlogPostPageComponent } from "./page/blog/blog-post-page.component";
// import { BlogComponent } from "./page/blog/blog.component";
// import { EventDetailsPageComponent } from "./page/events/event-details-page.component";
// import { EventsPageComponent } from "./page/events/events-page.component";
// import { FallbackPageComponent } from "./page/fallback/fallback-page.component";
// import { FeaturesPageComponent } from "./page/features/features-page.component";
// import { GenericPageComponent } from "./page/generic/generic-page.component";
// import { HomePageComponent } from "./page/home/home-page.component";
// import { PricingPageComponent } from "./page/pricing/pricing-page.component";
// import { LearningArticleComponent } from "./page/resource-hub/learning-article.component";
// import { LectureDetailsPageComponent } from "./page/lectures/lecture-details-page.component";
// import { LecturesPageComponent } from "./page/lectures/lectures-page.component";
// import { LegalDocumentComponent } from "./page/legal/legal-document.component";
// import { PhilosophyPageComponent } from "./page/philosophy/philosophy-page.component";
// import { ResourceHubComponent } from "./page/resource-hub/resource-hub.component";
// import { StartupProgramPageComponent } from "./page/startup-program/startup-program-page.component";
// import { SupportPageComponent } from "./page/support/support-page.component";
// import { RequestTechTalkPageComponent } from "./page/tech-talk/request-tech-talk-page.component";
// import { PaperDetailsPageComponent } from "./page/papers/paper-details-page.component";
// import { PapersPageComponent } from "./page/papers/papers-page.component";
// import { dynamicPageSchemas, genericPageSchemas, staticPageSchemas } from "./website-routes";
//
// const staticPages: Record<(typeof staticPageSchemas)[number]["path"], Route> = {
//     "": { component: HomePageComponent },
//     blog: { component: BlogComponent, title: "TypeDB Blog" },
//     events: { component: EventsPageComponent, title: "TypeDB Events" },
//     features: { component: FeaturesPageComponent, title: "TypeDB Features" },
//     fundamentals: { component: ResourceHubComponent, title: "TypeDB Fundamentals", data: { documentID: "fundamentalsPage" } },
//     learn: { component: ResourceHubComponent, title: "TypeDB Learning Center", data: { documentID: "learningCenter" } },
//     lectures: { component: LecturesPageComponent, title: "TypeDB Lectures" },
//     papers: { component: PapersPageComponent, title: "TypeDB Papers" },
//     philosophy: { component: PhilosophyPageComponent, title: "TypeDB Philosophy" },
//     pricing: { component: PricingPageComponent, title: "TypeDB Pricing" },
//     "request-tech-talk": { component: RequestTechTalkPageComponent, title: "TypeDB Tech Talk" },
//     "startup-program": { component: StartupProgramPageComponent, title: "TypeDB Startup Program" },
//     support: { component: SupportPageComponent, title: "TypeDB Support" },
// };
//
// const genericPages: Record<(typeof genericPageSchemas)[number]["path"], Route> = {
//     cloud: { component: GenericPageComponent, title: "TypeDB Cloud" },
//     studio: { component: GenericPageComponent, title: "TypeDB Studio" },
// };
//
// const dynamicPages: Record<(typeof dynamicPageSchemas)[number]["path"], Route> = {
//     "blog/:slug": { component: BlogPostPageComponent },
//     "blog/category/:slug": { component: BlogComponent },
//     "events/:slug": { component: EventDetailsPageComponent },
//     "lectures/:slug": { component: LectureDetailsPageComponent },
//     "legal/:slug": { component: LegalDocumentComponent },
//     "papers/:slug": { component: PaperDetailsPageComponent },
//     "applications/:slug": { component: LearningArticleComponent, data: { resourceType: "applicationArticle" } },
//     "fundamentals/:slug": { component: LearningArticleComponent, data: { resourceType: "fundamentalArticle" } },
// };

const routes: Routes = [
    // ...staticPageSchemas.map(({ path }) => ({
    //     path,
    //     ...staticPages[path],
    // })),
    //
    // ...genericPageSchemas.map(({ documentID, path }) => ({
    //     path,
    //     data: { documentID },
    //     ...genericPages[path],
    // })),
    //
    // ...dynamicPageSchemas.map(({ path }) => ({
    //     path,
    //     ...dynamicPages[path],
    // })),
    //
    // // TODO: remember to clean up these redirects eventually
    // { path: "introduction", redirectTo: "philosophy" },
    // { path: "deploy", redirectTo: "pricing" },
    // { path: "applications", redirectTo: "learn" },
    // { path: "services", redirectTo: "support" },
    // { path: "solutions/:route", redirectTo: "philosophy" },
    // { path: "webinars/:slug", redirectTo: "lectures/:slug" },
    // { path: "webinars", redirectTo: "lectures" },
    // { path: "white-papers/:slug", redirectTo: "papers" },
    // { path: "white-papers", redirectTo: "papers" },
    // { path: "privacy-policy", redirectTo: "legal/privacy-policy" },
    //
    // { path: "__fallback", component: FallbackPageComponent },
    { path: "**", component: _404PageComponent, title: "TypeDB: 404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "disabled" })],
    exports: [RouterModule],
})
export class RoutingModule {}

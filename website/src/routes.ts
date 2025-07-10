import { Route, Routes } from "@angular/router";
import { _404PageComponent } from "./page/404/404-page.component";
import { BlogComponent } from "./page/blog/blog.component";
import { EventsPageComponent } from "./page/events/events-page.component";
import { FeaturesPageComponent } from "./page/features/features-page.component";
import { HomePageComponent } from "./page/home/home-page.component";
import { LecturesPageComponent } from "./page/lectures/lectures-page.component";
import { PapersPageComponent } from "./page/papers/papers-page.component";
import { PhilosophyPageComponent } from "./page/philosophy/philosophy-page.component";
import { PricingPageComponent } from "./page/pricing/pricing-page.component";
import { ResourceHubComponent } from "./page/resource-hub/resource-hub.component";
import { StartupProgramPageComponent } from "./page/startup-program/startup-program-page.component";
import { SupportPageComponent } from "./page/support/support-page.component";
import { RequestTechTalkPageComponent } from "./page/tech-talk/request-tech-talk-page.component";

export const staticPageSchemas = [
    { path: "", schemaName: "homePage" },
    { path: "blog", schemaName: "blog" },
    { path: "pricing", schemaName: "pricingPage" },
    { path: "events", schemaName: "eventsPage" },
    { path: "lectures", schemaName: "lecturesPage" },
    { path: "features", schemaName: "featuresPage" },
    { path: "philosophy", schemaName: "philosophyPage" },
    { path: "learn", schemaName: "learningCenter" },
    { path: "fundamentals", schemaName: "fundamentalsPage" },
    { path: "request-tech-talk", schemaName: "requestTechTalkPage" },
    { path: "support", schemaName: "supportPage" },
    { path: "startup-program", schemaName: "startupProgramPage" },
    { path: "papers", schemaName: "papersPage" },
] as const satisfies readonly StaticPage[];

export const genericPageSchemas = [
    { path: "cloud", documentID: "cloudPage" },
    { path: "studio", documentID: "studioPage" },
] as const satisfies readonly GenericPage[];

export const dynamicPageSchemas = [
    { path: "applications/:slug", schemaName: "applicationArticle" },
    { path: "blog/:slug", schemaName: "blogPost" },
    { path: "blog/category/:slug", slugs: ["announcements", "engineering", "applications", "philosophy", "tutorials"] },
    { path: "events/:slug", schemaName: "liveEvent" },
    { path: "fundamentals/:slug", schemaName: "fundamentalArticle" },
    { path: "lectures/:slug", schemaName: "lecture" },
    { path: "legal/:slug", schemaName: "legalDocument" },
    // { path: "solutions/:slug", schemaName: "solutionPage", schemaSlugAccessor: "route.current" },
    { path: "papers/:slug", schemaName: "paper" },
] as const satisfies readonly DynamicPage[];

const staticPages: Record<(typeof staticPageSchemas)[number]["path"], Route> = {
    "": { component: HomePageComponent },
    blog: { component: BlogComponent, title: "TypeDB Blog" },
    events: { component: EventsPageComponent, title: "TypeDB Events" },
    features: { component: FeaturesPageComponent, title: "TypeDB Features" },
    fundamentals: { component: ResourceHubComponent, title: "TypeDB Fundamentals", data: { documentID: "fundamentalsPage" } },
    learn: { component: ResourceHubComponent, title: "TypeDB Learning Center", data: { documentID: "learningCenter" } },
    lectures: { component: LecturesPageComponent, title: "TypeDB Lectures" },
    papers: { component: PapersPageComponent, title: "TypeDB Papers" },
    philosophy: { component: PhilosophyPageComponent, title: "TypeDB Philosophy" },
    pricing: { component: PricingPageComponent, title: "TypeDB Pricing" },
    "request-tech-talk": { component: RequestTechTalkPageComponent, title: "TypeDB Tech Talk" },
    "startup-program": { component: StartupProgramPageComponent, title: "TypeDB Startup Program" },
    support: { component: SupportPageComponent, title: "TypeDB Support" },
};

interface StaticPage {
    path: string;
    schemaName: string;
}

interface GenericPage {
    path: string;
    documentID: string;
}

interface DynamicPageWithSchema {
    path: `${string}:slug${string}`;
    schemaName: string;
    schemaSlugAccessor?: string;
}

interface DynamicPagePredefined {
    path: `${string}:slug${string}`;
    slugs: readonly string[];
}

type DynamicPage = DynamicPageWithSchema | DynamicPagePredefined;

export const routes: Routes = [
    ...staticPageSchemas.map(({ path }) => ({
        path,
        ...staticPages[path],
    })),
    { path: "**", component: _404PageComponent },
];

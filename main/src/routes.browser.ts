import { Route, Routes } from "@angular/router";
import { _404PageComponent } from "./page/404/404-page.component";
import { BlogPostPageComponent } from "./page/blog/blog-post-page.component";
import { BlogComponent } from "./page/blog/blog.component";
import { FeaturesPageComponent } from "./page/features/features-page.component";
import { GenericPageComponent } from "./page/generic/generic-page.component";
import { HomePageComponent } from "./page/home/home-page.component";
import { LectureDetailsPageComponent } from "./page/lectures/lecture-details-page.component";
import { LecturesPageComponent } from "./page/lectures/lectures-page.component";
import { LegalDocumentComponent } from "./page/legal/legal-document.component";
import { PaperDetailsPageComponent } from "./page/papers/paper-details-page.component";
import { PapersPageComponent } from "./page/papers/papers-page.component";
import { PricingPageComponent } from "./page/pricing/pricing-page.component";
import { LearningArticleComponent } from "./page/resource-hub/learning-article.component";
import { ResourceHubComponent } from "./page/resource-hub/resource-hub.component";
import { StartupProgramPageComponent } from "./page/startup-program/startup-program-page.component";
import { SupportPageComponent } from "./page/support/support-page.component";
import { RequestTechTalkPageComponent } from "./page/tech-talk/request-tech-talk-page.component";
import { UseCasePageComponent } from "./page/use-cases/use-case-page.component";
import { blogCategories, blogCategoryList } from "typedb-web-schema";

export const staticPageSchemas = [
    { path: "", schemaName: "homePage" },
    { path: "blog", schemaName: "blog" },
    { path: "pricing", schemaName: "pricingPage" },
    { path: "lectures", schemaName: "lecturesPage" },
    { path: "features", schemaName: "featuresPage" },
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
    { path: "blog/category/:slug", slugs: blogCategoryList },
    { path: "fundamentals/:slug", schemaName: "fundamentalArticle" },
    { path: "lectures/:slug", schemaName: "lecture" },
    { path: "legal/:slug", schemaName: "legalDocument" },
    { path: "use-cases/:slug", schemaName: "useCasePage", schemaSlugAccessor: "route.current" },
    { path: "papers/:slug", schemaName: "paper" },
] as const satisfies readonly DynamicPage[];

// Blog pagination routes (separate from dynamicPageSchemas due to different path pattern)
export const blogPaginationRoutes = [
    { path: "blog/page/:page" },
    { path: "blog/category/:slug/page/:page" },
] as const;

const staticPages: Record<(typeof staticPageSchemas)[number]["path"], Route> = {
    "": { component: HomePageComponent },
    blog: { component: BlogComponent, title: "TypeDB Blog" },
    features: { component: FeaturesPageComponent, title: "TypeDB Features" },
    fundamentals: { component: ResourceHubComponent, title: "TypeDB Fundamentals", data: { documentID: "fundamentalsPage" } },
    learn: { component: ResourceHubComponent, title: "TypeDB Learning Center", data: { documentID: "learningCenter" } },
    lectures: { component: LecturesPageComponent, title: "TypeDB Lectures" },
    papers: { component: PapersPageComponent, title: "TypeDB Papers" },
    pricing: { component: PricingPageComponent, title: "TypeDB Pricing" },
    "request-tech-talk": { component: RequestTechTalkPageComponent, title: "TypeDB Tech Talk" },
    "startup-program": { component: StartupProgramPageComponent, title: "TypeDB Startup Program" },
    support: { component: SupportPageComponent, title: "TypeDB Support" },
};

const genericPages: Record<(typeof genericPageSchemas)[number]["path"], Route> = {
    cloud: { component: GenericPageComponent, title: "TypeDB Cloud" },
    studio: { component: GenericPageComponent, title: "TypeDB Studio" },
};

const dynamicPages: Record<(typeof dynamicPageSchemas)[number]["path"], Route> = {
    "blog/:slug": { component: BlogPostPageComponent },
    "blog/category/:slug": { component: BlogComponent },
    "lectures/:slug": { component: LectureDetailsPageComponent },
    "legal/:slug": { component: LegalDocumentComponent },
    "papers/:slug": { component: PaperDetailsPageComponent },
    "use-cases/:slug": { component: UseCasePageComponent },
    "applications/:slug": { 
        component: LearningArticleComponent, 
        data: { 
            resourceType: "applicationArticle"
        } 
    },
    "fundamentals/:slug": { 
        component: LearningArticleComponent, 
        data: { 
            resourceType: "fundamentalArticle"
        } 
    },
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
    ...genericPageSchemas.map(({ documentID, path }) => ({
        path,
        data: { documentID },
        ...genericPages[path],
    })),
    ...dynamicPageSchemas.map(({ path }) => ({
        path,
        ...dynamicPages[path],
    })),
    // Blog pagination routes
    { path: "blog/page/:page", component: BlogComponent, title: "TypeDB Blog" },
    { path: "blog/category/:slug/page/:page", component: BlogComponent },
    { path: "404", component: _404PageComponent }, /* Generates a 404.html page for Netlify to use */
    { path: "**", component: _404PageComponent },
];

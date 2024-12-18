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

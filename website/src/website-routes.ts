export const staticPages = [
    { path: "", schemaName: "homePage" },
    { path: "blog", schemaName: "blog" },
    { path: "deploy", schemaName: "deploymentPage" },
    { path: "events", schemaName: "eventsPage" },
    { path: "learn", schemaName: "learningCenter" },
    { path: "lectures", schemaName: "lecturesPage" },
    { path: "features", schemaName: "featuresPage" },
    { path: "philosophy", schemaName: "philosophyPage" },
    { path: "request-tech-talk", schemaName: "requestTechTalkPage" },
    { path: "support", schemaName: "supportPage" },
    // { path: "white-papers", schemaName: "whitePapersPage" },
] as const satisfies readonly StaticPage[];

export const genericPages = [
    { path: "cloud", documentID: "cloudPage", title: "TypeDB Cloud" },
    { path: "studio", documentID: "studioPage", title: "TypeDB Studio" },
] as const satisfies readonly GenericPage[];

export const dynamicPages = [
    { path: "applications/:slug", schemaName: "applicationArticle" },
    { path: "blog/:slug", schemaName: "blogPost" },
    { path: "blog/category/:slug", slugs: ["announcements", "engineering", "applications", "philosophy", "tutorials"] },
    { path: "events/:slug", schemaName: "liveEvent" },
    { path: "fundamentals/:slug", schemaName: "fundamentalArticle" },
    { path: "lectures/:slug", schemaName: "lecture" },
    { path: "legal/:slug", schemaName: "legalDocument" },
    // { path: "solutions/:slug", schemaName: "solutionPage", schemaSlugAccessor: "route.current" },
    // { path: "white-papers/:slug", schemaName: "whitePaper" },
] as const satisfies readonly DynamicPage[];

interface StaticPage {
    path: string;
    schemaName: string;
}

interface GenericPage {
    path: string;
    documentID: string;
    title: string;
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

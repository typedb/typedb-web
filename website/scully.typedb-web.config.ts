import { getSitemapPlugin, SitemapConfig } from "@gammastream/scully-plugin-sitemap";
import { ScullyConfig, setPluginConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";

import {
    applicationArticleRoutes,
    blogCategoryRoutes,
    blogPostRoutes,
    eventRoutes,
    fundamentalArticleRoutes,
    genericPageRoute,
    lectureRoutes,
    staticPageRoute,
    whitePaperRoutes,
} from "./scully/plugins/plugins";

const SitemapPlugin = getSitemapPlugin();
setPluginConfig<SitemapConfig>(SitemapPlugin, {
    urlPrefix: process.env["URL"] || "https://typedb.com",
    changeFreq: "daily",
    sitemapFilename: "sitemap-main.xml",
    routes: {
        "/": { priority: "0.9" },
        "/philosophy": { priority: "0.8" },
        "/features": { priority: "0.7" },
        "/cloud": { priority: "0.6" },
    },
});

export const config: ScullyConfig = {
    projectRoot: "./src",
    projectName: "typedb-web",
    outDir: process.env["OUT_DIR"],
    routes: {
        "/fundamentals/:slug": { type: fundamentalArticleRoutes },
        "/applications/:slug": { type: applicationArticleRoutes },
        "/blog/category/:categorySlug": { type: blogCategoryRoutes },
        "/blog/:slug": { type: blogPostRoutes },
        // "/solutions/:route": { type: solutionRoutes },
        "/lectures/:slug": { type: lectureRoutes },
        "/white-papers/:slug": { type: whitePaperRoutes },
        "/events/:slug": { type: eventRoutes },
        "/events": { type: staticPageRoute, sanityType: "eventsPage" },
        "/studio": { type: genericPageRoute, pageId: "studioPage" },
    },
    puppeteerLaunchOptions: {
        // executablePath: "/opt/homebrew/bin/chromium",
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    },
};

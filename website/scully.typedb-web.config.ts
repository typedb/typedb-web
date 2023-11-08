import { ScullyConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";
import { applicationArticleRoutes, blogCategoryRoutes, blogPostRoutes, eventRoutes, fundamentalArticleRoutes, webinarRoutes, whitePaperRoutes } from "./scully/plugins/plugins";

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
        "/webinars/:slug": { type: webinarRoutes },
        "/white-papers/:slug": { type: whitePaperRoutes },
        "/events/:slug": { type: eventRoutes },
    },
    puppeteerLaunchOptions: {
        // executablePath: "/opt/homebrew/bin/chromium",
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    },
};

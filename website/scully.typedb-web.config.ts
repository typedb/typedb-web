import { ScullyConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";
import { blogCategoryRoutes, blogPostRoutes, eventRoutes, solutionRoutes, webinarRoutes, whitePaperRoutes } from "./scully/plugins/plugins";

export const config: ScullyConfig = {
    projectRoot: "./src",
    projectName: "typedb-web",
    outDir: process.env["OUT_DIR"],
    routes: {
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

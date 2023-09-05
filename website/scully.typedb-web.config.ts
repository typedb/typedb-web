import { ScullyConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";
import { blogCategoryRoutes, blogPostRoutes, solutionRoutes } from "./scully/plugins/plugins";

export const config: ScullyConfig = {
    projectRoot: "./src",
    projectName: "typedb-web",
    outDir: process.env["OUT_DIR"],
    routes: {
        "/blog/category/:categorySlug": { type: blogCategoryRoutes },
        "/blog/:slug": { type: blogPostRoutes },
        "/solutions/:route": { type: solutionRoutes },
    },
    puppeteerLaunchOptions: {
        // executablePath: "/opt/homebrew/bin/chromium",
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    },
};

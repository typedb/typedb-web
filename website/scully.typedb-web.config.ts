import { ScullyConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";
import { blogPostRoutes, pageRoutes } from "./scully/plugins/plugins";

export const config: ScullyConfig = {
    projectRoot: "./src",
    projectName: "typedb-web",
    outDir: process.env["OUT_DIR"],
    routes: {
        "/blog/:slug": { type: blogPostRoutes },
        "/:route": { type: pageRoutes },
    },
    puppeteerLaunchOptions: {
        // executablePath: "/opt/homebrew/bin/chromium",
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    },
};

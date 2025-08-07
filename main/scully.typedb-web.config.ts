import { getSitemapPlugin, SitemapConfig } from "@gammastream/scully-plugin-sitemap";
import { ScullyConfig, setPluginConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";

import { getWebsiteRoutes } from "./scully/get-main-routes";

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
    ignoredRoutes: ["/__fallback"],
});

export const config: ScullyConfig = {
    projectRoot: "./src",
    projectName: "typedb-web",
    outDir: process.env["OUT_DIR"],
    extraRoutes: getWebsiteRoutes(),
    routes: {},
    puppeteerLaunchOptions: {
        // executablePath: "/opt/homebrew/bin/chromium",
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const scully_plugin_sitemap_1 = require("@gammastream/scully-plugin-sitemap");
const scully_1 = require("@scullyio/scully");
require("@scullyio/scully-plugin-puppeteer");
const get_website_routes_1 = require("./scully/get-website-routes");
const SitemapPlugin = (0, scully_plugin_sitemap_1.getSitemapPlugin)();
(0, scully_1.setPluginConfig)(SitemapPlugin, {
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
exports.config = {
    projectRoot: "./src",
    projectName: "typedb-web",
    outDir: process.env["OUT_DIR"],
    extraRoutes: (0, get_website_routes_1.getWebsiteRoutes)(),
    routes: {},
    puppeteerLaunchOptions: {
        executablePath: "/opt/homebrew/bin/chromium",
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    },
};

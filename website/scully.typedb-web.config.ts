import { ScullyConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";
import { pageRoutes } from "./scully/plugins/plugins";

export const config: ScullyConfig = {
    projectRoot: "./src",
    projectName: "typedb-web",
    outDir: process.env["OUT_DIR"],
    routes: {
        "/:route": { type: pageRoutes },
    },
};

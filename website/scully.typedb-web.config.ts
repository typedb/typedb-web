import { ScullyConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";
import { pageRoutes } from "./scully/plugins/plugins";


export const config: ScullyConfig = {
    projectRoot: "./src",
    projectName: "typedb-web",
    outDir: "./dist/static",
    routes: {
        "/:route": { type: pageRoutes },
    },
};

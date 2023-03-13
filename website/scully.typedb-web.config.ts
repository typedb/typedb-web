import { ScullyConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";

export const config: ScullyConfig = {
    projectRoot: "./src",
    projectName: "typedb-web",
    outDir: "./dist/static",
    routes: {},
};

import { defineCliConfig } from 'sanity/cli';
import { config } from "./config";

export default defineCliConfig({
    api: {
        projectId: config.projectId,
        dataset: config.dataset
    },
    deployment: {
        appId: "619a0e1398759b9641295962",
    },
    studioHost: "typedb",
});

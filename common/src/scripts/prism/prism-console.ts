import Prism from "prismjs";

Prism.languages["typedb-console"] = {
    comment: {
        pattern: /#.*/,
    },
    command: {
        pattern: /\b(database|transaction|commit|close)\b/,
        alias: "keyword"
    },
    subcommand: {
        pattern: /\b(schema|write|read|create|list|delete)\b/,
        alias: "intention"
    }
};

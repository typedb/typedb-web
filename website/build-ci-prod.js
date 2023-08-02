const { exec } = require("child_process");

exec("OUT_DIR=./dist/static npx scully --project typedb-web --scanRoutes --noPrompt", (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
        console.log(`ERROR: ${err}`);
        process.exit(1);
    }
    const lines = stdout.split("\n");
    const brokenRender = lines.find(line => line.includes("rendered into") && !line.includes("data.json"));
    if (brokenRender) {
        const brokenRoute = brokenRender.match("Route \"(.*)\" rendered into ")[1];
        console.error(`ERROR: Scully failed to prerender the route: "${brokenRoute}" ("data.json" was not generated)`);
        process.exit(1);
    }
});

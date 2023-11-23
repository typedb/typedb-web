const { execSync } = require("child_process");
const path = require("path");

try {
    execSync("pnpm build", { cwd: path.dirname(__dirname) });
} catch (err) {
    console.error(err.stdout?.toString() || err);
    process.exit(1);
}

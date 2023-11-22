const { execSync } = require("child_process");
const path = require("path");

try {
    execSync("pnpm build", { cwd: path.dirname(__dirname) });
} catch (err) {
    console.error(new Error(err.stderr?.toString() || err));
}

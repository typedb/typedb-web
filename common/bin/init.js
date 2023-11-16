const { execSync } = require("child_process");
const path = require("path");

execSync("pnpm build", { cwd: path.dirname(__dirname) });

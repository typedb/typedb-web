/**
 * Vendors Font Awesome Pro (CSS + webfonts) from our kit's CDN into src/assets, so the site
 * self-hosts them (no third-party kit script, no fontawesome.com requests at runtime).
 *
 * The files are NOT committed: this repo is public and the FA Pro license forbids publishing
 * Pro assets in public repositories - src/assets/fonts/fontawesome/ is gitignored and this
 * script runs as the package's postinstall hook (`pnpm install` covers local dev and Netlify
 * alike; run `pnpm fetch-fontawesome` to re-vendor manually, e.g. after bumping FA_VERSION).
 * It is a no-op when the assets are already present for the pinned version, and tolerates
 * being offline in that case.
 */
const fs = require("fs");
const path = require("path");

const KIT_TOKEN = "f7ba4755e0";
const KIT_ID = "94014023";
const FA_VERSION = "7.2.0"; // webfonts release referenced by the kit CSS; bump deliberately
const KIT_CSS_URL = `https://ka-p.fontawesome.com/assets/${KIT_TOKEN}/${KIT_ID}/kit.css?token=${KIT_TOKEN}`;
const SHIMS_CSS_URL = `https://ka-p.fontawesome.com/releases/v7.3.1/css/pro-v4-shims.min.css?token=${KIT_TOKEN}`;
const WEBFONT_URL_PREFIX = `https://ka-p.fontawesome.com/releases/v${FA_VERSION}/webfonts/`;

const FA_DIR = path.join(__dirname, "src/assets/fonts/fontawesome");
const CSS_PATH = path.join(FA_DIR, "css/fontawesome.css");
const WEBFONTS_DIR = path.join(FA_DIR, "webfonts");
const VERSION_MARKER = path.join(FA_DIR, `.vendored-${FA_VERSION}-${KIT_ID}`);

async function fetchOk(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} fetching ${url}`);
    return res;
}

async function main() {
    if (fs.existsSync(VERSION_MARKER) && fs.existsSync(CSS_PATH)) {
        console.log(`[fontawesome] Already vendored (${FA_VERSION}), skipping fetch.`);
        return;
    }

    console.log(`[fontawesome] Vendoring kit ${KIT_TOKEN} (FA ${FA_VERSION})...`);
    fs.mkdirSync(path.dirname(CSS_PATH), { recursive: true });
    fs.mkdirSync(WEBFONTS_DIR, { recursive: true });

    const kitCss = await (await fetchOk(KIT_CSS_URL)).text();
    const shimsCss = await (await fetchOk(SHIMS_CSS_URL)).text();
    const combined = `${kitCss}\n${shimsCss}`;

    const fontUrls = [...new Set(combined.match(/https:\/\/ka-p\.fontawesome\.com\/releases\/[^)"' ]+\.woff2/g) || [])];
    if (fontUrls.length === 0) throw new Error("No webfont URLs found in kit CSS - has the CDN layout changed?");
    console.log(`[fontawesome] Downloading ${fontUrls.length} webfont subsets...`);

    const CONCURRENCY = 12;
    const queue = [...fontUrls];
    await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
        for (let url = queue.shift(); url; url = queue.shift()) {
            const dest = path.join(WEBFONTS_DIR, path.basename(url));
            const buffer = Buffer.from(await (await fetchOk(`${url}?token=${KIT_TOKEN}`)).arrayBuffer());
            if (buffer.subarray(0, 4).toString() !== "wOF2") throw new Error(`Not a woff2 file: ${url}`);
            fs.writeFileSync(dest, buffer);
        }
    }));

    const localCss = combined.replaceAll(WEBFONT_URL_PREFIX, "../webfonts/");
    const leftover = localCss.match(/url\(https?:[^)]+\)/g);
    if (leftover) throw new Error(`Unrewritten external font URLs remain: ${leftover.slice(0, 3).join(", ")}`);
    fs.writeFileSync(CSS_PATH, localCss);
    fs.writeFileSync(VERSION_MARKER, new Date().toISOString());
    console.log(`[fontawesome] Done: css (${Math.round(localCss.length / 1024)} KB) + ${fontUrls.length} webfonts.`);
}

main().catch((err) => {
    // Offline reinstall with assets already vendored: keep `pnpm install` working.
    if (fs.existsSync(CSS_PATH)) {
        console.warn(`[fontawesome] Fetch failed (${err.message}) but a vendored copy exists - continuing with it.`);
        return;
    }
    console.error(`[fontawesome] FAILED: ${err.message}`);
    process.exit(1);
});

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// --- CONFIGURATION ---
// Ensure this points to your browser output folder
const DIST_FOLDER = path.join(__dirname, 'dist/main/browser');

// Regex to find the TransferState script
const STATE_REGEX = /<script id="ng-state" type="application\/json">([\s\S]*?)<\/script>/;

// --- HELPERS ---
function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });
    return arrayOfFiles;
}

function generateHash(content) {
    return crypto.createHash('md5').update(content).digest('hex').substring(0, 10);
}

function parseState(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    const stateMatch = html.match(STATE_REGEX);
    if (!stateMatch) return null;
    return { html, state: JSON.parse(stateMatch[1]) };
}

// --- PASS 1: find state keys whose value is byte-identical on every page ---
// Those (the Sanity dataset, post summaries, topnav/footer) go into a single shared file that
// the browser caches once across the whole site, instead of being re-downloaded per page.
function findSharedKeys(pages) {
    const valueHashesByKey = new Map(); // key -> Set of value hashes
    const occurrencesByKey = new Map(); // key -> number of pages containing it
    for (const { state } of pages) {
        for (const [key, value] of Object.entries(state)) {
            const hash = generateHash(JSON.stringify(value));
            if (!valueHashesByKey.has(key)) valueHashesByKey.set(key, new Set());
            valueHashesByKey.get(key).add(hash);
            occurrencesByKey.set(key, (occurrencesByKey.get(key) || 0) + 1);
        }
    }
    const sharedKeys = [];
    for (const [key, hashes] of valueHashesByKey) {
        if (hashes.size === 1 && occurrencesByKey.get(key) === pages.length) sharedKeys.push(key);
    }
    return sharedKeys;
}

// --- PASS 2: write the shared file and rewrite each page ---
function writeSharedStateFile(sharedState) {
    const sharedJson = JSON.stringify(sharedState);
    const fileName = `ng-state-shared.${generateHash(sharedJson)}.js`;
    fs.writeFileSync(path.join(DIST_FOLDER, fileName), `window.__ngStateShared = ${sharedJson};`);
    return { fileName, size: sharedJson.length };
}

function optimizeHtml({ filePath, html, state }, sharedKeys, sharedFileName) {
    const pageState = {};
    for (const [key, value] of Object.entries(state)) {
        if (!sharedKeys.includes(key)) pageState[key] = value;
    }

    const pageJson = JSON.stringify(pageState);
    const stateFileName = `ng-state.${generateHash(pageJson)}.js`;
    const htmlDir = path.dirname(filePath);

    // Create a JS file that merges the shared state with this page's own state and injects it
    // as the script element Angular's TransferState looks for before bootstrapping.
    const stateJs = `(function(){
  var s = document.createElement('script');
  s.id = 'ng-state';
  s.type = 'application/json';
  s.textContent = JSON.stringify(Object.assign({}, window.__ngStateShared, JSON.parse(${JSON.stringify(pageJson)})));
  document.body.appendChild(s);
})();`;

    fs.writeFileSync(path.join(htmlDir, stateFileName), stateJs);

    const pageStatePath = '/' + path.relative(DIST_FOLDER, path.join(htmlDir, stateFileName)).replace(/\\/g, '/');

    // Both scripts are blocking and execute in order, so the shared state is always
    // available before the page state file merges it.
    const newHtml = html.replace(
        STATE_REGEX,
        `<script src="/${sharedFileName}"></script><script src="${pageStatePath}"></script>`
    );
    fs.writeFileSync(filePath, newHtml);
    console.log(`[ng-state] Extracted to ${stateFileName} for ${path.basename(path.dirname(filePath))}/${path.basename(filePath)}`);
}

// --- EXECUTION ---
console.log('Starting TransferState Optimization (Extracting to shared + per-page files)...');

if (fs.existsSync(DIST_FOLDER)) {
    const htmlFiles = getAllHtmlFiles(DIST_FOLDER);
    const pages = [];
    for (const filePath of htmlFiles) {
        const parsed = parseState(filePath);
        if (parsed) pages.push({ filePath, ...parsed });
    }
    if (pages.length === 0) {
        console.log('No pages with TransferState found.');
        process.exit(0);
    }

    const sharedKeys = findSharedKeys(pages);
    const sharedState = {};
    for (const key of sharedKeys) sharedState[key] = pages[0].state[key];
    const { fileName: sharedFileName, size } = writeSharedStateFile(sharedState);
    console.log(`[ng-state] Shared keys across all ${pages.length} pages: ${sharedKeys.join(', ')}`);
    console.log(`[ng-state] Shared state file: ${sharedFileName} (${Math.round(size / 1024)} KB)`);

    pages.forEach((page) => optimizeHtml(page, sharedKeys, sharedFileName));
    console.log(`\n✅ Optimization complete. Processed ${pages.length} files.`);
} else {
    console.error(`Error: Dist folder not found at ${DIST_FOLDER}`);
    process.exit(1);
}

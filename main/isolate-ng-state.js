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

// --- MAIN PROCESSOR ---
function optimizeHtml(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // Remove TransferState script entirely - we don't need it for static page behavior
    const stateMatch = html.match(STATE_REGEX);
    if (stateMatch) {
        html = html.replace(STATE_REGEX, '');
        fs.writeFileSync(filePath, html);
        console.log(`[ng-state] Removed from ${path.basename(filePath)}`);
    }
}

// --- EXECUTION ---
console.log('Starting TransferState Optimization (Keeping Styles Inlined)...');

if (fs.existsSync(DIST_FOLDER)) {
    const htmlFiles = getAllHtmlFiles(DIST_FOLDER);
    htmlFiles.forEach(optimizeHtml);
    console.log(`\n✅ Optimization complete. Processed ${htmlFiles.length} files.`);
} else {
    console.error(`Error: Dist folder not found at ${DIST_FOLDER}`);
    process.exit(1);
}

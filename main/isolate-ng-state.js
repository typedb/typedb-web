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

    // Extract TransferState to a separate JS file for better caching
    const stateMatch = html.match(STATE_REGEX);
    if (stateMatch) {
        const stateContent = stateMatch[1];
        const stateHash = generateHash(stateContent);
        const stateFileName = `ng-state.${stateHash}.js`;

        // Get the directory of the HTML file (for placing the state file alongside it)
        const htmlDir = path.dirname(filePath);
        const stateFilePath = path.join(htmlDir, stateFileName);

        // Create JS file that injects the state into a script element before Angular bootstraps
        // This ensures TransferState is available when Angular looks for it
        const stateJs = `(function(){
  var s = document.createElement('script');
  s.id = 'ng-state';
  s.type = 'application/json';
  s.textContent = ${JSON.stringify(stateContent)};
  document.body.appendChild(s);
})();`;

        fs.writeFileSync(stateFilePath, stateJs);

        // Calculate the absolute path from the dist root to the state file
        // This ensures the script loads correctly regardless of URL structure
        const absolutePath = '/' + path.relative(DIST_FOLDER, stateFilePath).replace(/\\/g, '/');

        // Replace the inline state with a script tag that loads the external file
        // Use a blocking script to ensure state is available before Angular bootstraps
        html = html.replace(STATE_REGEX, `<script src="${absolutePath}"></script>`);

        fs.writeFileSync(filePath, html);
        console.log(`[ng-state] Extracted to ${stateFileName} for ${path.basename(filePath)}`);
    }
}

// --- EXECUTION ---
console.log('Starting TransferState Optimization (Extracting to separate files)...');

if (fs.existsSync(DIST_FOLDER)) {
    const htmlFiles = getAllHtmlFiles(DIST_FOLDER);
    htmlFiles.forEach(optimizeHtml);
    console.log(`\n✅ Optimization complete. Processed ${htmlFiles.length} files.`);
} else {
    console.error(`Error: Dist folder not found at ${DIST_FOLDER}`);
    process.exit(1);
}

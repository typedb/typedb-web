const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// --- CONFIGURATION ---
// adjust this to match your dist output path
const DIST_FOLDER = path.join(__dirname, 'dist/typedb-web/browser');

// Regex to find the TransferState script
const STATE_REGEX = /<script id="ng-state" type="application\/json">([\s\S]*?)<\/script>/;

// Regex to find ALL <style> blocks (Component styles injected by SSR)
// We use a capture group for the content inside the tags
const STYLE_REGEX = /<style[^>]*>([\s\S]*?)<\/style>/gi;

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
    let modified = false;
    const dirName = path.dirname(filePath);

    // ---------------------------------------------------------
    // 1. EXTRACT TRANSFER STATE (JSON)
    // ---------------------------------------------------------
    const stateMatch = html.match(STATE_REGEX);
    if (stateMatch && stateMatch[1]) {
        const stateContent = stateMatch[1];
        const jsonFileName = `ng-state-${generateHash(stateContent)}.json`;
        const jsonFilePath = path.join(dirName, jsonFileName);

        // Write JSON file
        fs.writeFileSync(jsonFilePath, stateContent);
        console.log(`[JSON] Extracted ${jsonFileName}`);

        // Replacement Script (Synchronous XHR)
        const loaderScript = `
    <script>
      (function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './${jsonFileName}', false);
        xhr.send(null);
        if (xhr.status === 200) {
          var s = document.createElement('script');
          s.id = 'ng-state';
          s.type = 'application/json';
          s.textContent = xhr.responseText;
          document.body.appendChild(s);
        }
      })();
    </script>`;

        html = html.replace(STATE_REGEX, loaderScript);
        modified = true;
    }

    // ---------------------------------------------------------
    // 2. EXTRACT COMPONENT STYLES (CSS)
    // ---------------------------------------------------------
    // We find all matches first, then we replace them.
    const styleMatches = [...html.matchAll(STYLE_REGEX)];

    if (styleMatches.length > 0) {
        let combinedCss = '';

        // Aggregate all CSS content
        styleMatches.forEach(match => {
            combinedCss += match[1] + '\n';
        });

        // Only proceed if we actually found content
        if (combinedCss.trim().length > 0) {
            const cssFileName = `styles-ssr-${generateHash(combinedCss)}.css`;
            const cssFilePath = path.join(dirName, cssFileName);

            // Write CSS file
            fs.writeFileSync(cssFilePath, combinedCss);
            console.log(`[CSS]  Extracted ${styleMatches.length} blocks to ${cssFileName}`);

            // Remove all <style> blocks from HTML
            html = html.replace(STYLE_REGEX, '');

            // Inject the <link> tag for the new CSS file
            // We place it before the closing </head>
            const linkTag = `<link rel="stylesheet" href="./${cssFileName}">`;

            if (html.includes('</head>')) {
                html = html.replace('</head>', `${linkTag}\n</head>`);
            } else {
                // Fallback if no head tag (rare)
                html = linkTag + html;
            }

            modified = true;
        }
    }

    // ---------------------------------------------------------
    // SAVE CHANGES
    // ---------------------------------------------------------
    if (modified) {
        fs.writeFileSync(filePath, html);
    }
}

// --- EXECUTION ---

console.log('Starting Post-Process Optimization...');
if (fs.existsSync(DIST_FOLDER)) {
    const htmlFiles = getAllHtmlFiles(DIST_FOLDER);
    htmlFiles.forEach(optimizeHtml);
    console.log(`Processed ${htmlFiles.length} HTML files.`);
} else {
    console.error(`Error: Dist folder not found at ${DIST_FOLDER}`);
    process.exit(1);
}

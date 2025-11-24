const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// --- CONFIGURATION ---
// Ensure this points to the browser folder
const DIST_FOLDER = path.join(__dirname, 'dist/main/browser');

// Regexes
const STATE_REGEX = /<script id="ng-state" type="application\/json">([\s\S]*?)<\/script>/;
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

    // 1. EXTRACT TRANSFER STATE (JSON)
    const stateMatch = html.match(STATE_REGEX);
    if (stateMatch && stateMatch[1]) {
        const stateContent = stateMatch[1];
        const jsonFileName = `ng-state-${generateHash(stateContent)}.json`;
        const jsonFilePath = path.join(dirName, jsonFileName);

        // Write JSON file
        fs.writeFileSync(jsonFilePath, stateContent);
        console.log(`[JSON] Extracted ${jsonFileName}`);

        // --- REPLACEMENT SCRIPT (RUNTIME PATH RESOLUTION) ---
        // Instead of calculating paths at build time, we use the browser's current location.
        // 1. Get current path (e.g. /blog/post or /blog/post/)
        // 2. Ensure it ends in a slash
        // 3. Append filename
        const loaderScript = `
    <script>
      (function() {
        try {
          var path = window.location.pathname;
          // If we are not at root and missing a trailing slash, add it
          if (path.slice(-1) !== '/') { path += '/'; }
          
          // Construct the URL relative to the current route
          var jsonUrl = path + '${jsonFileName}';

          var xhr = new XMLHttpRequest();
          xhr.open('GET', jsonUrl, false);
          xhr.send(null);
          
          if (xhr.status === 200) {
            var response = xhr.responseText;
            // Safety check: ensure it's JSON, not a 404 HTML page
            if (response && response.trim().charAt(0) === '{') {
              var s = document.createElement('script');
              s.id = 'ng-state';
              s.type = 'application/json';
              s.textContent = response;
              document.body.appendChild(s);
            }
          }
        } catch (e) {
          console.warn('TransferState extraction failed, falling back to app bootstrap.');
        }
      })();
    </script>`;

        html = html.replace(STATE_REGEX, loaderScript);
        modified = true;
    }

    // 2. EXTRACT COMPONENT STYLES (CSS)
    const styleMatches = [...html.matchAll(STYLE_REGEX)];
    if (styleMatches.length > 0) {
        let combinedCss = '';
        styleMatches.forEach(match => { combinedCss += match[1] + '\n'; });

        if (combinedCss.trim().length > 0) {
            const cssFileName = `styles-ssr-${generateHash(combinedCss)}.css`;
            const cssFilePath = path.join(dirName, cssFileName);

            // For CSS, we still use relative paths for the <link> tag
            // Browsers handle <link href="./file.css"> correctly relative to the document
            const cssLinkPath = `./${cssFileName}`;

            fs.writeFileSync(cssFilePath, combinedCss);
            console.log(`[CSS]  Extracted to ${cssFileName}`);

            html = html.replace(STYLE_REGEX, '');
            const linkTag = `<link rel="stylesheet" href="${cssLinkPath}">`;

            if (html.includes('</head>')) {
                html = html.replace('</head>', `${linkTag}\n</head>`);
            } else {
                html = linkTag + html;
            }
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, html);
    }
}

// --- EXECUTION ---
if (fs.existsSync(DIST_FOLDER)) {
    const htmlFiles = getAllHtmlFiles(DIST_FOLDER);
    htmlFiles.forEach(optimizeHtml);
    console.log(`\n✅ Optimization complete. Processed ${htmlFiles.length} files.`);
} else {
    console.error(`Error: Dist folder not found at ${DIST_FOLDER}`);
    process.exit(1);
}

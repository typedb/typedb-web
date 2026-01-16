const fs = require('fs');
const path = require('path');
const glob = require('glob');

const distDir = path.join(__dirname, 'dist/main/browser');
const files = glob.sync(`${distDir}/**/*.html`);

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');

  // 1. Identify the styles.css filename using the hyphenated hash pattern
  // This captures "styles-PNN3Q66V.css" or any similar hash
  const styleMatch = html.match(/href="(styles-[A-Z0-9]+\.css)"/);
  
  if (styleMatch) {
    const styleFilename = styleMatch[1];
    const preloadTag = `<link rel="preload" href="${styleFilename}" as="style">`;
    const stylesheetTag = `<link rel="stylesheet" href="${styleFilename}">`;
    
    // 2. Add the preload tag. 
    // We search for the exact stylesheet tag you provided and 
    // put the preload tag right before it.
    if (!html.includes('rel="preload"')) {
      html = html.replace(stylesheetTag, `${preloadTag}${stylesheetTag}`);
    }
  }

  // 3. Remove all style tags (including those with attributes like ng-app-id)
  // This uses a non-greedy match to ensure it doesn't delete content between two separate style tags
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');

    // 4. Add FOUC shield to hide content until styles are applied
    const foucShield = '<style id="fouc-shield">html{visibility:hidden;opacity:0}</style><script>const show=()=>document.getElementById("fouc-shield").remove();window.addEventListener("DOMContentLoaded",show);</script>';

    if (!html.includes('fouc-shield')) {
        html = html.replace('<head>', `<head>${foucShield}`);
    }

  fs.writeFileSync(file, html);
  console.log(`Isolated styles: ${file}`);
});

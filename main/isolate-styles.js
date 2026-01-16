const fs = require('fs');
const path = require('path');
const glob = require('glob'); // npm install glob

const distDir = path.join(__dirname, 'dist/main/browser');
const files = glob.sync(`${distDir}/**/*.html`);

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  // Removes any style tag that has the ng-app-id attribute
  html = html.replace(/<style>[\s\S]*?<\/style>/g, '');
  fs.writeFileSync(file, html);
  console.log(`Isolated styles: ${file}`);
});

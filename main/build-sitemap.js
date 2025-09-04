const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

// ⚡ CONFIGURATION
const BASE_URL = 'https://typedb.com';
const DIST_FOLDER = './dist/main/browser'; // Prerender output folder

// Define priority per route (optional)
const routePriorities = {
    '/': 0.9,
    '/blog': 0.7,
    '/pricing': 0.6,
};

// Define change frequency per route (optional)
const routeChangeFreq = {
};

// Default values if route not specified
const DEFAULT_PRIORITY = 0.5;
const DEFAULT_CHANGEFREQ = 'weekly';

// Recursively get all HTML files from prerender output
function getHtmlFiles(dir, files = []) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getHtmlFiles(fullPath, files);
        } else if (file.endsWith('.html')) {
            // Convert file path to URL path
            const relativePath = path.relative(DIST_FOLDER, fullPath);
            let urlPath = '/' + relativePath.replace(/index\.html$/, '').replace(/\\/g, '/');
            if (!urlPath.endsWith('/')) urlPath = urlPath.replace(/\.html$/, '');
            files.push(urlPath);
        }
    });
    return files;
}

// Generate sitemap
async function generateSitemap() {
    const urls = getHtmlFiles(DIST_FOLDER);

    const sitemap = new SitemapStream({ hostname: BASE_URL });
    const writeStream = fs.createWriteStream(path.join(DIST_FOLDER, 'sitemap.xml'));
    sitemap.pipe(writeStream);

    urls.forEach(url => {
        const priority = routePriorities[url] ?? DEFAULT_PRIORITY;
        const changefreq = routeChangeFreq[url] ?? DEFAULT_CHANGEFREQ;
        sitemap.write({ url, priority, changefreq });
    });

    sitemap.end();

    await streamToPromise(sitemap);
    console.log('✅ sitemap.xml generated successfully!');
}

generateSitemap();

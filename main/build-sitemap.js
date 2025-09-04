const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const formatter = require('xml-formatter');

// ⚡ CONFIG
const BASE_URL = 'https://typedb.com'; // <-- change to your domain
const DIST_FOLDER = './dist/main/browser'; // <-- prerender output folder

// Optional per-route hints
const routePriorities = {
    '/': 0.9,
    '/blog': 0.7,
    '/pricing': 0.6
};
const routeChangeFreq = {}; // e.g. { '/blog': 'daily' }
const DEFAULT_PRIORITY = 0.5;
const DEFAULT_CHANGEFREQ = 'weekly';

// Collect prerendered HTML paths -> URL paths
function getHtmlFiles(dir, files = []) {
    if (!fs.existsSync(dir)) throw new Error(`DIST folder not found: ${dir}`);
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            getHtmlFiles(fullPath, files);
        } else if (file.endsWith('.html')) {
            const relativePath = path.relative(DIST_FOLDER, fullPath);
            let urlPath = '/' + relativePath.replace(/index\.html$/, '').replace(/\\/g, '/');
            if (!urlPath.endsWith('/')) urlPath = urlPath.replace(/\.html$/, '');
            if (urlPath.length > 1 && urlPath.endsWith('/')) urlPath = urlPath.slice(0, -1); // normalize trailing slash
            files.push(urlPath);
        }
    });
    return Array.from(new Set(files)); // de-dupe just in case
}

async function generateSitemap() {
    const urls = getHtmlFiles(DIST_FOLDER);
    if (!urls.length) throw new Error('No prerendered HTML files found. Did you run the prerender step?');

    const sitemapStream = new SitemapStream({ hostname: BASE_URL });

    const now = new Date().toISOString();
    urls.forEach(url => {
        sitemapStream.write({
            url,
            priority: routePriorities[url] ?? DEFAULT_PRIORITY,
            changefreq: routeChangeFreq[url] ?? DEFAULT_CHANGEFREQ,
            lastmod: now
        });
    });
    sitemapStream.end();

    const xmlBuffer = await streamToPromise(sitemapStream);

    // Pretty-print, but collapse text nodes onto a single line per element
    const prettyXml = formatter(xmlBuffer.toString(), {
        indentation: '  ',
        collapseContent: true,  // <<— this is the magic for no extra newlines
        lineSeparator: '\n'
    });

    fs.writeFileSync(path.join(DIST_FOLDER, 'sitemap-main.xml'), prettyXml);
    console.log(`✅ sitemap.xml generated with ${urls.length} URLs`);
}

generateSitemap().catch(err => {
    console.error('❌ Sitemap generation failed:', err);
    process.exit(1);
});

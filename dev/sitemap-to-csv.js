import fs from "fs";
import { XMLParser } from "fast-xml-parser";

const SITEMAP_URL = "https://typedb.com/sitemap-main.xml";
const OUTPUT_FILE = "urls.csv";

async function run() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: ${res.status}`);
  }

  const xml = await res.text();

  const parser = new XMLParser();
  const data = parser.parse(xml);

  const urls = data.urlset?.url ?? [];
  const list = Array.isArray(urls) ? urls : [urls];

  const lines = ["url"];

  for (const entry of list) {
    if (entry.loc) {
      // Minimal CSV escaping
      const value = `"${entry.loc.replace(/"/g, '""')}"`;
      lines.push(value);
    }
  }

  fs.writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf8");
  console.log(`Wrote ${lines.length - 1} URLs to ${OUTPUT_FILE}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

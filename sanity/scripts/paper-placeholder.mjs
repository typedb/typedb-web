#!/usr/bin/env node
/**
 * Draws placeholder artwork for a paper we can only link to: the first page of a paper with solid bars in place
 * of the text, in the same framing as the real first-page thumbnails on the papers page.
 *
 * Usage (from the sanity folder):
 *   node scripts/paper-placeholder.mjs --name <slug> [options]
 *
 * Options:
 *   --name <slug>     Output name, and the seed for the layout: the same slug always draws the same page (required)
 *   --out-dir <dir>   Where to write files (default: ./paper-output)
 *   --authors <n>     Number of author blocks, 1 to 4 (default: picked from the seed)
 *   --columns <n>     1 or 2 text columns (default: picked from the seed)
 *
 * Writes typedb-paper-<slug>-landscape.png (1924x1080) and typedb-paper-<slug>-portrait.png (1220x1580).
 * Upload them to Sanity as the paper's landscape and portrait images.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { Resvg } from "@resvg/resvg-js";

const { values: args } = parseArgs({
    options: {
        name: { type: "string" },
        "out-dir": { type: "string", default: "paper-output" },
        authors: { type: "string" },
        columns: { type: "string" },
    },
});
if (!args.name) {
    console.error("Missing --name <slug>");
    process.exit(1);
}

const BACKGROUND = "#14121f";
const PAGE = "#ffffff";
const TITLE = "#2b2937";
const HEADING = "#4b4860";
const TEXT = "#c9c7d3";
const ACCENT = "#7ba0ff";

function seededRandom(seed) {
    let h = 2166136261;
    for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return () => {
        h += 0x6d2b79f5;
        let t = h;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Page content in a 1220x1580 box. The same drawing serves both images. */
function drawPage(seed) {
    const random = seededRandom(seed);
    const between = (min, max) => min + random() * (max - min);
    const pick = (...options) => options[Math.floor(random() * options.length)];
    const authors = Number(args.authors) || pick(1, 2, 2, 3, 3, 4);
    const columns = Number(args.columns) || pick(1, 2, 2);

    const width = 1220;
    const marginX = 130;
    const contentWidth = width - marginX * 2;
    const shapes = [];
    const bar = (x, y, w, h, fill) =>
        shapes.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h}" rx="${h / 2}" fill="${fill}"/>`);
    const centredBar = (y, w, h, fill) => bar((width - w) / 2, y, w, h, fill);

    let y = 150;
    const titleLines = pick(1, 2, 2);
    for (let i = 0; i < titleLines; i++) {
        const isLast = i === titleLines - 1;
        centredBar(y, contentWidth * (isLast && titleLines > 1 ? between(0.45, 0.7) : between(0.82, 0.96)), 26, TITLE);
        y += 48;
    }
    y += 34;

    const authorWidth = contentWidth / authors;
    for (let i = 0; i < authors; i++) {
        const centre = marginX + authorWidth * (i + 0.5);
        [[between(150, 210), 14, HEADING], [between(170, 230), 10, TEXT], [between(90, 140), 10, TEXT]].forEach(
            ([w, h, fill], row) => {
                const fitted = Math.min(w, authorWidth - 40);
                bar(centre - fitted / 2, y + row * 28, fitted, h, fill);
            },
        );
    }
    y += 3 * 28 + 44;

    const gutter = 44;
    const columnWidth = columns === 1 ? contentWidth : (contentWidth - gutter) / 2;
    const lineGap = 23;
    const bottom = 1580 - 120;

    for (let column = 0; column < columns; column++) {
        const x = marginX + column * (columnWidth + gutter);
        let cy = y;
        let isFirstBlock = column === 0;
        while (cy < bottom - 80) {
            if (isFirstBlock || random() < 0.45) {
                bar(x, cy, between(110, 240), 14, isFirstBlock ? ACCENT : HEADING);
                cy += 36;
            }
            isFirstBlock = false;
            const lines = Math.round(between(5, 13));
            for (let i = 0; i < lines && cy < bottom; i++) {
                const isLast = i === lines - 1;
                bar(x, cy, columnWidth * (isLast ? between(0.3, 0.8) : between(0.95, 1)), 9, TEXT);
                cy += lineGap;
            }
            cy += 26;
        }
    }

    return shapes.join("\n");
}

function portraitSvg(page) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1220 1580" width="1220" height="1580">
<rect width="1220" height="1580" fill="${PAGE}"/>
${page}
</svg>`;
}

function landscapeSvg(page) {
    const scale = 1.12;
    const pageWidth = 1220 * scale;
    const x = (1924 - pageWidth) / 2;
    const y = 96;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1924 1080" width="1924" height="1080">
<defs>
<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
<stop offset="0.45" stop-color="${BACKGROUND}" stop-opacity="0"/>
<stop offset="1" stop-color="${BACKGROUND}" stop-opacity="0.85"/>
</linearGradient>
<clipPath id="frame"><rect width="1924" height="1080"/></clipPath>
</defs>
<rect width="1924" height="1080" fill="${BACKGROUND}"/>
<g clip-path="url(#frame)">
<g transform="translate(${x} ${y}) scale(${scale})">
<rect width="1220" height="1580" fill="${PAGE}"/>
${page}
</g>
</g>
<rect width="1924" height="1080" fill="url(#fade)"/>
</svg>`;
}

const page = drawPage(args.name);
await mkdir(args["out-dir"], { recursive: true });
for (const [kind, svg] of [["landscape", landscapeSvg(page)], ["portrait", portraitSvg(page)]]) {
    const file = join(args["out-dir"], `typedb-paper-${args.name}-${kind}.png`);
    await writeFile(file, new Resvg(svg).render().asPng());
    console.log(file);
}

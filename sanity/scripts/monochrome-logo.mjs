#!/usr/bin/env node
/**
 * Converts an organisation's logo into the single-colour style used by the website's logo rows:
 * one neutral grey on a transparent background, trimmed, and exported as 1x and 2x PNGs.
 *
 * Usage (from the sanity folder):
 *   node scripts/monochrome-logo.mjs <file-or-url> --name <slug> [options]
 *
 * Examples:
 *   node scripts/monochrome-logo.mjs https://example.com/logo.svg --name example --preview
 *   node scripts/monochrome-logo.mjs carleton.svg --name carleton --knockout "#ffffff,#e91d27"
 *   node scripts/monochrome-logo.mjs brgm.svg --name brgm --exclude 0,0,0.256,1 --exclude 0.527,0,1,0.316
 *
 * Options:
 *   --name <slug>          Output name: writes typedb-org-<slug>.png and typedb-org-<slug>@2x.png (required)
 *   --out-dir <dir>        Where to write files (default: ./logo-output)
 *   --colour <hex>         Colour of the logo (default: #A3A3A3, the grey used on the website)
 *   --height <px>          Height of the 1x PNG; the 2x PNG is double (default: 66, as for existing CMS logos)
 *   --mode <mode>          How ink is told apart from background:
 *                            auto        alpha for SVGs and for images transparent at their corners, else background
 *                                        (default)
 *                            alpha       use the image's own transparency (logos already on a transparent background)
 *                            background  opacity grows with each pixel's colour distance from the background
 *                                        (JPEGs, screenshots, logos on a solid colour)
 *   --background <hex>     Background colour for background mode (default: the image's most common colour)
 *   --knockout <hex,...>   Colours to cut out as transparent holes, e.g. white lettering on a solid shape,
 *                          or a red leaf on a black shield. Without this, overlapping colours merge into one shape
 *   --exclude <x0,y0,x1,y1>  Drop a region before converting, as fractions of the source width/height (0 to 1),
 *                          e.g. to remove a tagline or a co-branded block. Repeatable
 *   --inset <px>           Shave this many source pixels from every edge first (removes faint frame lines)
 *   --preview              Also write a preview on the website's dark background, at the height the
 *                          logo row would show it (see logoHeight in organisation-logos.component.ts)
 *
 * Upload the @2x PNG to Sanity as the organisation's logo. The logo row sizes logos by their shape, so no padding
 * is needed; if a logo still looks too small or too large, set the organisation's "Logo size adjustment" in Studio.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { parseArgs } from "node:util";
import sharp from "sharp";
import { Resvg } from "@resvg/resvg-js";

// Working resolution: sources are rendered or scaled to this height before conversion, then downscaled at the end
const WORKING_HEIGHT = 600;
// In background mode, colour distance from the background at which ink is fully opaque. Below it, opacity scales
// down, which keeps anti-aliased edges smooth while pale inks (light green, grey) still come out solid
const FULL_INK_DISTANCE = 120;
// In knockout, colour distance from a knockout colour at which ink is fully kept
const FULL_KNOCKOUT_DISTANCE = 90;
// Must match the logo row's sizing in main/src/framework/organisation-logos/organisation-logos.component.ts
const LOGO_AREA = 4 * 32 * 32, LOGO_MIN_HEIGHT = 20, LOGO_MAX_HEIGHT = 56;
const PREVIEW_BACKGROUND = "#0e0e0e";

const { values: opts, positionals } = parseArgs({
    allowPositionals: true,
    options: {
        "name": { type: "string" },
        "out-dir": { type: "string", default: "logo-output" },
        "colour": { type: "string", default: "#A3A3A3" },
        "height": { type: "string", default: "66" },
        "mode": { type: "string", default: "auto" },
        "background": { type: "string" },
        "knockout": { type: "string" },
        "exclude": { type: "string", multiple: true, default: [] },
        "inset": { type: "string", default: "0" },
        "preview": { type: "boolean", default: false },
    },
});

function fail(message) {
    console.error(`Error: ${message}\nRun with a file or URL and --name <slug>; see the comment at the top of this script.`);
    process.exit(1);
}

const hexToRgb = (hex) => {
    const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
    if (!m) fail(`'${hex}' is not a colour like #a3a3a3`);
    return m.slice(1).map((x) => parseInt(x, 16));
};
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

async function readSource(source) {
    if (/^https?:\/\//.test(source)) {
        const res = await fetch(source, { headers: { "User-Agent": "Mozilla/5.0 (typedb-web monochrome-logo script)" } });
        if (!res.ok) fail(`downloading ${source} failed: HTTP ${res.status}`);
        const isSvg = (res.headers.get("content-type") || "").includes("svg") || new URL(source).pathname.endsWith(".svg");
        return { bytes: Buffer.from(await res.arrayBuffer()), isSvg };
    }
    return { bytes: await readFile(source), isSvg: extname(source).toLowerCase() === ".svg" };
}

/** Decodes the source to raw RGBA pixels at the working height */
async function decode({ bytes, isSvg }, inset) {
    if (isSvg) {
        const rendered = new Resvg(bytes.toString("utf8"), { fitTo: { mode: "height", value: WORKING_HEIGHT } }).render();
        return { data: Buffer.from(rendered.pixels), width: rendered.width, height: rendered.height, isSvg: true };
    }
    let image = sharp(bytes).ensureAlpha();
    if (inset > 0) {
        const meta = await sharp(bytes).metadata();
        image = image.extract({ left: inset, top: inset, width: meta.width - inset * 2, height: meta.height - inset * 2 });
    }
    const { data, info } = await image.resize({ height: WORKING_HEIGHT, kernel: "lanczos3" }).raw()
        .toBuffer({ resolveWithObject: true });
    return { data, width: info.width, height: info.height, isSvg: false };
}

function cornersAreTransparent({ data, width, height }) {
    return [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]]
        .every(([x, y]) => data[(y * width + x) * 4 + 3] < 16);
}

/**
 * The most common opaque colour, which for a logo image is its background. More robust than sampling the corners,
 * which a frame or a full-bleed shape can reach (e.g. a logo drawn inside a box)
 */
function dominantColour({ data, width, height }) {
    const buckets = new Map();
    for (let i = 0; i < width * height * 4; i += 4) {
        if (data[i + 3] < 128) continue;
        const key = ((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3);
        const bucket = buckets.get(key) || { count: 0, sum: [0, 0, 0] };
        bucket.count++;
        bucket.sum[0] += data[i]; bucket.sum[1] += data[i + 1]; bucket.sum[2] += data[i + 2];
        buckets.set(key, bucket);
    }
    const top = [...buckets.values()].sort((a, b) => b.count - a.count)[0];
    return top ? top.sum.map((x) => x / top.count) : [255, 255, 255];
}

function convert(image, { mode, background, knockout, excludes, colour }) {
    const { data, width, height } = image;
    const out = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const pixel = [data[i], data[i + 1], data[i + 2]];
            let alpha = data[i + 3] / 255;
            if (excludes.some(([x0, y0, x1, y1]) => x >= x0 * width && x < x1 * width && y >= y0 * height && y < y1 * height)) {
                alpha = 0;
            }
            if (alpha && mode === "background") alpha *= Math.min(1, distance(pixel, background) / FULL_INK_DISTANCE);
            if (alpha && knockout.length) {
                alpha *= Math.min(1, Math.min(...knockout.map((k) => distance(pixel, k))) / FULL_KNOCKOUT_DISTANCE);
            }
            out.set([...colour, Math.round(alpha * 255)], i);
        }
    }
    return out;
}

const displayHeight = (aspectRatio) =>
    Math.round(Math.min(LOGO_MAX_HEIGHT, Math.max(LOGO_MIN_HEIGHT, Math.sqrt(LOGO_AREA / aspectRatio))));

async function main() {
    const [source] = positionals;
    if (!source) fail("give a logo file path or URL");
    if (!opts.name || !/^[a-z0-9-]+$/.test(opts.name)) fail("--name must be a lowercase slug, e.g. --name tu-delft");
    if (!["auto", "alpha", "background"].includes(opts.mode)) fail(`unknown --mode '${opts.mode}'`);
    const height = Number(opts.height), inset = Number(opts.inset);
    const excludes = opts.exclude.map((x) => {
        const rect = x.split(",").map(Number);
        if (rect.length !== 4 || rect.some((v) => !(v >= 0 && v <= 1))) fail(`--exclude '${x}' must be four fractions x0,y0,x1,y1`);
        return rect;
    });

    const image = await decode(await readSource(source), inset);
    // SVGs render onto transparency, so their own alpha is right even when the artwork fills the corners
    const mode = opts.mode !== "auto" ? opts.mode : image.isSvg || cornersAreTransparent(image) ? "alpha" : "background";
    const background = opts.background ? hexToRgb(opts.background) : dominantColour(image);
    const knockout = opts.knockout ? opts.knockout.split(",").map(hexToRgb) : [];

    const pixels = convert(image, { mode, background, knockout, excludes, colour: hexToRgb(opts.colour) });
    // Trim against transparency explicitly: trimming against the top-left pixel would cut into a logo whose
    // shape reaches the corner (e.g. a solid square)
    const trimmed = await sharp(pixels, { raw: { width: image.width, height: image.height, channels: 4 } })
        .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 }).png().toBuffer();

    await mkdir(opts["out-dir"], { recursive: true });
    const base = join(opts["out-dir"], `typedb-org-${opts.name}`);
    for (const [suffix, h] of [["", height], ["@2x", height * 2]]) {
        await sharp(trimmed).resize({ height: h, kernel: "lanczos3" }).png().toFile(`${base}${suffix}.png`);
    }
    const meta = await sharp(`${base}@2x.png`).metadata();
    const aspectRatio = meta.width / meta.height;
    const shownAt = displayHeight(aspectRatio);

    if (opts.preview) {
        const pad = 48;
        const logo = await sharp(`${base}@2x.png`).resize({ height: shownAt * 2 }).toBuffer();
        const { width: logoWidth } = await sharp(logo).metadata();
        await sharp({
            create: { width: logoWidth + pad * 4, height: shownAt * 2 + pad * 4, channels: 4, background: PREVIEW_BACKGROUND },
        }).composite([{ input: logo, left: pad * 2, top: pad * 2 }]).png().toFile(`${base}-preview.png`);
    }

    console.log([
        `${basename(source)} -> ${base}.png, ${base}@2x.png${opts.preview ? `, ${base}-preview.png` : ""}`,
        `mode: ${mode}${mode === "background" ? ` (background ${background.map(Math.round).join(",")})` : ""}`,
        `aspect ratio ${aspectRatio.toFixed(2)}: the logo row shows it ${shownAt}px tall`,
    ].join("\n"));
}

main().catch((e) => fail(e.message || String(e)));

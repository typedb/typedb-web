import { ImageLoaderConfig } from "@angular/common";

/**
 * Image loader for NgOptimizedImage: rewrites Sanity CDN URLs to request a rendition scaled to
 * the width Angular calculates for the slot (never upscaled), in the best format the browser
 * supports. This is what makes ngSrc generate meaningful srcsets - without a loader, every
 * candidate would be the full-size original. Non-Sanity URLs and SVGs pass through untouched.
 */
export function sanityImageLoader(config: ImageLoaderConfig): string {
    const { src, width } = config;
    if (!src.startsWith("https://cdn.sanity.io/images/")) return src;
    const url = new URL(src);
    if (url.pathname.endsWith(".svg")) return src;
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    if (width) url.searchParams.set("w", String(Math.round(width)));
    return url.toString();
}

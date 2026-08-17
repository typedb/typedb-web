import { Injectable } from "@angular/core";

import imageUrlBuilder from "@sanity/image-url";

const SANITY_PROJECT_ID = "xndl14mc";
const SANITY_DATASET = "production";

@Injectable({
    providedIn: "root",
})
export class ImageBuilder {
    private readonly imageBuilder = imageUrlBuilder({
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
    });

    image(source: string) {
        // Asset URLs from SanityDataset carry CDN params (?auto=format), but the builder parses
        // the URL's filename back into an asset id and chokes on a query string. Strip it; the
        // builder re-applies its own params below.
        return this.imageBuilder.image(source.split("?")[0]).auto("format").fit("max").dpr(typeof window !== "undefined" ? window.devicePixelRatio : 1);
    }
}

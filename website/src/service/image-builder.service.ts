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
        return this.imageBuilder.image(source).auto("format").fit("max").dpr(3);
    }
}

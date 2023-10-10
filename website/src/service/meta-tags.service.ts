import { Injectable } from "@angular/core";
import { Meta, MetaDefinition } from "@angular/platform-browser";

import { MetaTags } from "typedb-web-schema";

@Injectable({
    providedIn: "root",
})
export class MetaTagsService {
    constructor(private meta: Meta) {}

    register(metaTags: MetaTags) {
        const metaDefinitions: MetaDefinition[] = [];
        if (metaTags.description) {
            metaDefinitions.push({ name: "description", content: metaTags.description });
        }
        if (metaTags.keywords?.length) {
            metaDefinitions.push({ name: "keywords", content: metaTags.keywords.join(", ") });
        }
        if (metaTags.ogImage) {
            metaDefinitions.push({ property: "og:image", content: metaTags.ogImage });
        }
        metaTags.custom.forEach(({ property, content }) => metaDefinitions.push({ property, content }));

        const tags = this.meta.addTags(metaDefinitions, true);

        return { unregister: () => tags.forEach((tag) => this.meta.removeTagElement(tag)) };
    }
}

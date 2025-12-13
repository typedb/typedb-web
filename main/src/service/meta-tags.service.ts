import { Injectable } from "@angular/core";
import { Meta, MetaDefinition } from "@angular/platform-browser";

import { MetaTags } from "typedb-web-schema";

export interface MetaTagFallbacks {
    title?: string;
    description?: string;
    ogImage?: string;
}

@Injectable({
    providedIn: "root",
})
export class MetaTagsService {
    private readonly DEFAULT_TITLE = "TypeDB";
    private readonly DEFAULT_DESCRIPTION = "The polymorphic database powering the enterprise";
    private readonly DEFAULT_OG_IMAGE = "https://typedb.com/assets/social-share.png";

    constructor(private meta: Meta) {}

    register(metaTags: MetaTags, fallbacks?: MetaTagFallbacks) {
        const metaDefinitions: MetaDefinition[] = [];

        const title = metaTags.title || fallbacks?.title || this.DEFAULT_TITLE;
        const description = metaTags.description || fallbacks?.description || this.DEFAULT_DESCRIPTION;
        const ogImage = metaTags.ogImage || fallbacks?.ogImage || this.DEFAULT_OG_IMAGE;

        metaDefinitions.push({ property: "og:title", content: title });
        metaDefinitions.push({ name: "twitter:title", content: title });

        metaDefinitions.push({ name: "description", content: description });
        metaDefinitions.push({ name: "twitter:description", content: description });

        metaDefinitions.push({ property: "og:image", content: ogImage });
        metaDefinitions.push({ name: "twitter:image", content: ogImage });

        if (metaTags.keywords?.length) {
            metaDefinitions.push({ name: "keywords", content: metaTags.keywords });
        }

        metaTags.custom.forEach(({ property, content }) => metaDefinitions.push({ property, content }));

        for (const metaDef of metaDefinitions) {
            this.meta.removeTag(metaDef.property ? `property='${metaDef.property}'` : `name='${metaDef.name}'`);
            this.meta.addTag(metaDef);
        }
    }
}

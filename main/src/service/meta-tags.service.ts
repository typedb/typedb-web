import { Injectable } from "@angular/core";
import { Meta, MetaDefinition } from "@angular/platform-browser";

import { MetaTags } from "typedb-web-schema";

export type OgType = "website" | "article";

export interface ArticleMeta {
    publishedTime: Date;
    modifiedTime?: Date;
    author?: string;
    section?: string;
    tags?: string[];
}

export interface MetaTagFallbacks {
    title?: string;
    description?: string;
    ogImage?: string;
    ogType?: OgType;
    article?: ArticleMeta;
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
        metaDefinitions.push({ property: "og:description", content: description });
        metaDefinitions.push({ name: "twitter:description", content: description });

        metaDefinitions.push({ property: "og:image", content: ogImage });
        metaDefinitions.push({ name: "twitter:image", content: ogImage });

        metaDefinitions.push({ property: "og:type", content: fallbacks?.ogType || "website" });

        if (fallbacks?.article) {
            const { publishedTime, modifiedTime, author, section, tags } = fallbacks.article;
            metaDefinitions.push({ property: "article:published_time", content: publishedTime.toISOString() });
            if (modifiedTime) {
                metaDefinitions.push({ property: "article:modified_time", content: modifiedTime.toISOString() });
            }
            if (author) {
                metaDefinitions.push({ property: "article:author", content: author });
            }
            if (section) {
                metaDefinitions.push({ property: "article:section", content: section });
            }
            if (tags) {
                tags.forEach(tag => metaDefinitions.push({ property: "article:tag", content: tag }));
            }
        }

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

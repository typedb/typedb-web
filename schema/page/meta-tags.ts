import { defineField } from "@sanity/types";
import { collapsible, required } from "../common-fields";
import { SanityDataset, SanityImage } from "../sanity-core";
import { PropsOf } from "../util";

export interface SanityMetaTags {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: SanityImage;
    custom?: { property: string; content: string }[];
}

export class MetaTags {
    readonly title?: string;
    readonly description?: string;
    readonly keywords?: string;
    readonly ogImage?: string;
    readonly custom: { property: string; content: string }[];

    protected constructor(data: PropsOf<MetaTags>) {
        this.title = data.title;
        this.description = data.description;
        this.keywords = data.keywords;
        this.ogImage = data.ogImage;
        this.custom = data.custom;
    }

    static fromSanity(data: SanityMetaTags, db: SanityDataset) {
        return new MetaTags({
            title: data.title,
            description: data.description,
            keywords: data.keywords,
            ogImage: data.ogImage && db.resolveRef(data.ogImage.asset).url,
            custom: data.custom?.map(({ content, property }) => ({ content, property })) || [],
        });
    }
}

export const customMetaTagFieldName = "customMetaTag";

export const customMetaTagFieldSchema = defineField({
    type: "object",
    name: customMetaTagFieldName,
    fields: [
        { name: "property", type: "string", validation: required },
        { name: "content", type: "string", validation: required },
    ],
    preview: {
        select: {
            title: "property",
            subtitle: "content",
        },
    },
});

const customMetaTagsField = defineField({
    title: "Custom",
    name: "custom",
    type: "array",
    of: [{ type: customMetaTagFieldName }],
});

export const metaTagsFieldName = "metaTags";

export const metaTagsField = defineField({
    title: "Meta Tags",
    name: metaTagsFieldName,
    type: "object",
    fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
        { name: "keywords", type: "string", description: "Comma-separated list" },
        { name: "ogImage", title: "Image", type: "image" },
        customMetaTagsField,
    ],
    options: collapsible,
});

export const metaTagsSchemas = [customMetaTagFieldSchema];

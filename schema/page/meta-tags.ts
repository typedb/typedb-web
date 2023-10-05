import { defineField } from "@sanity/types";
import { collapsibleOptions, requiredRule } from "../common-fields";
import { SanityDataset, SanityImage } from "../sanity-core";
import { PropsOf } from "../util";

export interface SanityMetaTags {
    description?: string;
    keywords?: string[];
    ogImage?: SanityImage;
    custom?: { property: string; content: string }[];
}

export class MetaTags {
    readonly description?: string;
    readonly keywords?: string[];
    readonly ogImage?: string;
    readonly custom: { property: string; content: string }[];

    protected constructor(data: PropsOf<MetaTags>) {
        this.description = data.description;
        this.keywords = data.keywords;
        this.ogImage = data.ogImage;
        this.custom = data.custom;
    }

    static fromSanity(data: SanityMetaTags, db: SanityDataset) {
        return new MetaTags({
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
        { name: "property", type: "string", validation: requiredRule },
        { name: "content", type: "string", validation: requiredRule },
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
        { name: "description", type: "text" },
        { name: "keywords", type: "array", of: [{ type: "string" }], options: { layout: "tags" } },
        { name: "ogImage", title: "Image", type: "image" },
        customMetaTagsField,
    ],
    options: collapsibleOptions,
});

export const metaTagsSchemas = [customMetaTagFieldSchema];

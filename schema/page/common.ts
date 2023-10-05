import { BlockContentIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { Document, SanityDataset, SanityImage } from "../sanity-core";
import { PropsOf } from "../util";
import { collapsibleOptions, requiredRule } from "../common-fields";

export interface SanityPage extends SanityDocument {
    title: string;
    metaTags?: SanityMetaTags;
}

export abstract class Page extends Document {
    readonly title: string;
    readonly metaTags: MetaTags;

    protected constructor(data: SanityPage, db: SanityDataset) {
        super(data);
        this.title = data.title;
        this.metaTags = MetaTags.fromSanity(data.metaTags || {}, db);
    }
}

const bodyTextSchema = defineType({
    name: "bodyText",
    title: "Body Text",
    icon: BlockContentIcon,
    type: "array",
    of: [{ type: "block" }],
});

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

const customMetaTagsField = defineField({
    title: "Custom",
    name: "custom",
    type: "array",
    of: [
        {
            type: "object",
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
        },
    ],
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

export const basePageSchemas = [bodyTextSchema];

import { DocumentVideoIcon, LinkIcon } from "@sanity/icons";
import { defineField, defineType, Reference, SanityDocument, Slug, SlugRule } from "@sanity/types";
import { linkField, titleField, titleFieldName } from "./common-fields";
import { SanityDataset } from "./sanity-core";
import { Document } from "./sanity-core/document";

export type LinkType = "autoDetect" | "route" | "external";

export interface SanityLink extends SanityDocument {
    destination: Slug;
    type: LinkType;
    opensNewTab: boolean;
}

export interface SanityTextLink {
    text: string;
    link: Reference;
}

export interface SanityVideoEmbed extends SanityDocument {
    url: Slug;
}

export class Link {
    readonly destination: string;
    readonly type: LinkType;
    readonly opensNewTab: boolean;

    constructor(data: SanityLink) {
        this.destination = data.destination.current;
        this.type = data.type;
        this.opensNewTab = data.opensNewTab;
    }
}

export class TextLink extends Link {
    readonly text: string;

    constructor(data: SanityTextLink, db: SanityDataset) {
        super(db.resolveRef(data.link));
        this.text = data.text;
    }
}

export class VideoEmbed extends Document {
    readonly url: string;

    constructor(data: SanityVideoEmbed) {
        super(data);
        this.url = data.url.current;
    }
}

export const linkSchemaName = "link";

const linkSchema = defineType({
    name: linkSchemaName,
    icon: LinkIcon,
    type: "document",
    fields: [
        Object.assign({}, titleField, { title: "Description" }),
        defineField({
            name: "destination",
            title: "Link Address",
            type: "slug",
            validation: (rule: SlugRule) => rule.required(),
        }),
        defineField({
            name: "type",
            title: "Link Type",
            type: "string",
            initialValue: "autoDetect",
            options: {
                list: [
                    { title: "Auto-detect", value: "autoDetect" },
                    { title: "Route", value: "route" },
                    { title: "External Link", value: "external" },
                ],
                layout: "radio",
                direction: "horizontal",
            },
        }),
        defineField({
            name: "opensNewTab",
            title: "Opens in New Tab",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: { title: titleFieldName, destination: "destination.current" },
        prepare: (selection) => ({ title: selection.title, subtitle: selection.destination }),
    },
});

export const textLinkSchemaName = "textLink";

export const textLinkSchema = defineType({
    name: textLinkSchemaName,
    type: "object",
    fields: [
        defineField({
            name: "text",
            title: "Text",
            type: "string",
        }),
        linkField,
    ],
});

export const videoEmbedSchemaName = "videoEmbed";

const videoEmbedSchema = defineType({
    name: videoEmbedSchemaName,
    title: "Video Embed",
    icon: DocumentVideoIcon,
    type: "document",
    fields: [
        Object.assign({}, titleField, { title: "Description" }),
        defineField({
            name: "url",
            title: "URL",
            type: "slug",
            validation: (rule: SlugRule) => rule.required(),
        }),
    ],
})

export const linkSchemas = [linkSchema, textLinkSchema, videoEmbedSchema];

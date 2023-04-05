import { LinkIcon } from "@sanity/icons";
import { defineField, defineType, Reference, ReferenceRule, SanityDocument, Slug, SlugRule } from "@sanity/types";
import { linkField, titleField, titleFieldName } from "./common-fields";
import { SanityDataset } from "./sanity-core";
import { Document } from "./sanity-core/document";
import { schemaName } from "./util";

export type SanityAction = { text: string, link: Reference };

export type SanityActions = { actions: SanityAction[] };

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

export const linkSchemaName = schemaName(Link);

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

export const textLinkSchemaName = schemaName(TextLink);

const textLinkSchema = defineType({
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

export const buttonSchemaName = "button";

const buttonSchema = defineType({
    name: buttonSchemaName,
    type: "object",
    fields: [
        defineField({
            name: "style",
            title: "Style",
            description: "Primary (solid) buttons stand out more than secondary (hollow) ones",
            type: "string",
            options: {
                list: ["primary", "secondary"],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "primary",
        }),
        ...textLinkSchema.fields
    ],
    preview: {
        select: { text: "text", linkDestination: "link.destination.current", linkRoute: "link.route.current" },
        prepare: (selection) => ({ title: selection.text, subtitle: selection.linkDestination || selection.linkRoute }),
    },
});

const actionsSchema = defineType({
    name: "actions",
    title: "Actions",
    type: "array",
    of: [{type: "button"}, {type: "formEmailOnlyComponent"}],
});

export const actionSchemas = [linkSchema, textLinkSchema, buttonSchema, actionsSchema];

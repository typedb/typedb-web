import { LinkIcon } from "@sanity/icons";
import { defineField, defineType, Reference, ReferenceRule, UrlRule } from "@sanity/types";
import { titleField, titleFieldName } from "./common-fields";

export type SanityAction = { text: string, link: Reference };

export type SanityActions = { actions: SanityAction[] };

export const linkSchemaName = "link";
export type linkType = "autoDetect" | "route" | "external";

const linkSchema = defineType({
    name: linkSchemaName,
    icon: LinkIcon,
    type: "document",
    fields: [
        Object.assign({}, titleField, { title: "Description" }),
        defineField({
            name: "destination",
            title: "URL",
            type: "url",
            validation: (rule: UrlRule) => rule.required(),
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
    ],
    preview: {
        select: { title: titleFieldName, url: "url" },
        prepare: (selection) => ({ title: selection.title, subtitle: selection.url }),
    },
});

const textLinkSchema = defineType({
    name: "textLink",
    type: "object",
    fields: [
        defineField({
            name: "text",
            title: "Text",
            type: "string",
        }),
        defineField({
            name: "link",
            title: "Link",
            type: "reference",
            to: [{type: "link"}],
            validation: (rule: ReferenceRule) => rule.required(),
        }),
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
        select: { text: "text", linkDestination: "link.destination", linkRoute: "link.route.current" },
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

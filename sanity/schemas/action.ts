import { LinkIcon } from "@sanity/icons";
import { defineField, defineType, ReferenceRule, StringRule, UrlRule } from "sanity";

const externalLinkSchema = defineType({
    name: "externalLink",
    icon: LinkIcon,
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Description",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "destination",
            title: "URL",
            type: "url",
            validation: (rule: UrlRule) => rule.required(),
        }),
    ],
    preview: {
        select: { title: "title", url: "url" },
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
            to: [{type: "externalLink"}, {type: "page"}],
            validation: (rule: ReferenceRule) => rule.required(),
        }),
    ],
});

const buttonSchema = defineType({
    name: "button",
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
        select: { text: "text", action: "link" },
        prepare: (selection) => ({ title: selection.text, subtitle: selection.link }),
    },
});

const actionsSchema = defineType({
    name: "actions",
    title: "Actions (optional)",
    type: "array",
    of: [{type: "button"}, {type: "formEmailOnlyComponent"}],
});

export const actionSchemas = [externalLinkSchema, textLinkSchema, buttonSchema, actionsSchema];

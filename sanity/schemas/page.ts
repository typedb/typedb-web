import { BlockContentIcon, DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType, SlugRule } from "sanity";

const bodyTextSchema = defineType({
    name: "bodyText",
    title: "Body Text",
    icon: BlockContentIcon,
    type: "array",
    of: [{type: "block"}],
});

const sectionSchema = defineType({
    name: "pageSection",
    title: "Page Section",
    icon: BlockContentIcon,
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                { type: "bodyText" },
                { type: "actions" },
            ]
        })
    ]
});

const pageSchema = defineType({
    name: "page",
    icon: DocumentTextIcon,
    type: "document",
    title: "Page",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: "route",
            title: "Route",
            type: "slug",
            initialValue: {current: "/"},
            description: "URL fragment for this page. e.g. /typedb-studio",
            validation: (rule: SlugRule) => rule.custom((value, _context) => {
                if (!value?.current) return "Required";
                if (!value.current.startsWith("/") || value.current.startsWith("//")) return "Must start with a single '/'";
                return true;
            }),
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [{
                type: "reference",
                to: [
                    { type: "pageSection" },
                    { type: "technicolorBlockChain" },
                ],
            }],
        }),
    ],
    preview: {
        select: { title: "title", route: "route.current" },
        prepare: (selection) => ({ title: selection.title, subtitle: selection.route }),
    },
});

export const pageSchemas = [bodyTextSchema, sectionSchema, pageSchema];

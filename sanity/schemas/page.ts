import { BlockContentIcon, DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

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
});

export const pageSchemas = [bodyTextSchema, sectionSchema, pageSchema];

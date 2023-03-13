import { UlistIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, StringRule } from "sanity";

const keyPointSchema = defineType({
    name: "keyPoint",
    title: "Key Point",
    type: "object",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "body",
            type: "array",
            of: [{type: "block"}],
            validation: (rule: ArrayRule<any>) => rule.required(),
        }),
        // TODO
        // defineField({
        //     name: "icon",
        //     type: ???
        // }),
    ]
});

const keyPointListSchema = defineType({
    name: "keyPointList",
    title: "List of Key Points",
    icon: UlistIcon,
    type: "document",
    fields: [
        defineField({
            name: "name",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "keyPoints",
            type: "array",
            of: [{type: "keyPoint"}],
            validation: (rule: ArrayRule<any>) => rule.required(),
        }),
    ],
});

export const keyPointSchemas = [keyPointSchema, keyPointListSchema];

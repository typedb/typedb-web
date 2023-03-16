import { defineField, defineType, Rule } from "sanity";

export const keyPointPanelsSchema = defineType({
    name: "keyPointPanels",
    title: "Key Point Panels",
    description: "Key points about a product, use case, etc. presented as an array of 3 panels",
    type: "object",
    fields: [
        defineField({
            name: "name",
            type: "string",
        }),
        defineField({
            name: "content",
            type: "keyPointList",
            validation: (rule: Rule) => rule.required().custom((value, _context) => {
                return (value as any)?.keyPoints?.length === 3 ? true : "Must contain exactly 3 key points";
            }),
        }),
    ],
});

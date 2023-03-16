import { CodeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const customCssSchema = defineType({
    name: "customCSS",
    type: "document",
    icon: CodeIcon,
    fields: [
        defineField({
            name: "value",
            title: "CSS",
            description: "Global stylesheet applied to the entire website",
            type: "text",
            rows: 30,
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "Custom CSS" }),
    },
});

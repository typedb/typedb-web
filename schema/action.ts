import { defineField, defineType } from "@sanity/types";
import { textLinkSchema } from "./link";

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
    of: [{type: buttonSchemaName}],
});

export const actionSchemas = [buttonSchema, actionsSchema];

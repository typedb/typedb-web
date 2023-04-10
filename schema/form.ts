import { defineField, defineType } from "@sanity/types";

export const forms = {
    typeDBCloudWaitlist: "TypeDB Cloud Waitlist",
} as const;

export const formList = Object.keys(forms);

export type FormID = keyof typeof forms;

export const formsSchemaName = "forms";

export const formsSchema = defineType({
    name: formsSchemaName,
    title: "HubSpot Forms",
    type: "document",
    fields: [
        ...Object.entries(forms).map(([id, title]) => defineField({
            name: `${id}ID`,
            title: `${title} Form ID`,
            type: "string",
        })),
    ],
    preview: { prepare: (_selection) => ({ title: "HubSpot Forms" }) },
});

export const formField = defineField({
    name: "form",
    title: "Form",
    type: "string",
    options: {
        list: formList,
    },
});

export const formSchemas = [formsSchema];

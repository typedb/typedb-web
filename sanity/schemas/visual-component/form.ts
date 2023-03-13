import { defineField } from "sanity";

export const formEmailOnlyComponentSchema = defineField({
    name: "formEmailOnlyComponent",
    title: "Form (email address only)",
    type: "object",
    fields: [
        defineField({
            name: "form",
            title: "Form",
            type: "reference",
            to: [{type: "formEmailOnly"}],
        }),
        defineField({
            name: "submitButtonText",
            title: "'Submit' Button Text",
            type: "string",
            initialValue: "Submit",
        }),
    ],
});

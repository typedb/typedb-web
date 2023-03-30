import { defineField } from "@sanity/types";

export const formEmailOnlyComponentSchemaName = "formEmailOnlyComponent";

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
    preview: {
        select: { formName: "form.name", submitText: "submitButtonText" },
        prepare: (selection) => ({ title: selection.submitText, subtitle: selection.formName }),
    },
});

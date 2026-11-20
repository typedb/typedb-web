import { defineField, defineType, SanityDocument } from "@sanity/types";
import { requiredRule } from "./common-fields";
import { PortableText } from "./text";

export const forms = {
    contact: "Contact",
    newsletter: "Newsletter",
    feedback: "Feedback",
    eventSignup: "Event Signup",
} as const;

export const formList = Object.entries(forms).map(([id, title]) => ({ value: id, title: title }));

export type FormID = keyof typeof forms;

export type SanityCustomerIoForms = SanityDocument & { [key in FormID]: string } & {
    contactDescription: PortableText;
    newsletterDescription: PortableText;
    feedbackDescription: PortableText,
    eventSignupDescription: PortableText,
    eventSignupTitle?: string,
};

export const formsSchemaName = "forms";

export const formsSchema = defineType({
    name: formsSchemaName,
    title: "Forms",
    type: "document",
    fieldsets: [
        { name: "customerIoIds", title: "Customer.io IDs" },
        { name: "descriptions", title: "Descriptions" },
    ],
    fields: [
        ...Object.entries(forms).map(([id, title]) =>
            defineField({
                fieldset: "customerIoIds",
                name: id,
                title: `${title} Form ID`,
                type: "string",
                validation: requiredRule,
            })
        ),
        ...Object.entries(forms).map(([id, title]) =>
            defineField({
                fieldset: "descriptions",
                name: `${id}Description`,
                title: `${title} Form Description`,
                type: "array",
                of: [{type: "block"}],
            }),
        ),
        defineField({
            fieldset: "descriptions",
            name: "eventSignupTitle",
            title: "Event Signup Dialog Title",
            description: "Heading of the signup dialog, e.g. 'Register for upcoming webinar'. The dialog opens from any link to #register",
            type: "string",
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Forms" }) },
});

export const formField = defineField({
    name: "form",
    title: "Form",
    type: "string",
    options: {
        list: formList,
    },
});

export const cioFormIDFieldName = "cioFormID";

export const cioFormIDField = defineField({
    name: cioFormIDFieldName,
    title: "Customer.io Form ID",
    type: "string",
    validation: requiredRule,
});

export const formSchemas = [formsSchema];

import { defineField, defineType, SanityDocument } from "@sanity/types";
import { requiredRule } from "./common-fields";
import { PortableText } from "./text";

export const forms = {
    contact: "Contact",
    newsletter: "Newsletter",
    typeDBCloudWaitlist: "TypeDB Cloud Waitlist",
} as const;

export const formList = Object.entries(forms).map(([id, title]) => ({ value: id, title: title }));

export type FormID = keyof typeof forms;

export type SanityHubspotForms = SanityDocument & { [key in FormID]: string } & {
    contactDescription: PortableText;
    newsletterDescription: PortableText;
    typeDBCloudWaitlistDescription: PortableText;
};

export interface AirmeetRegistrationForm {
    airmeetID: string;
    email: string;
    firstName: string;
    lastName: string;
    companyName: string;
    jobTitle: string;
    city?: string;
    country?: string;
}

export const formsSchemaName = "forms";

export const formsSchema = defineType({
    name: formsSchemaName,
    title: "Forms",
    type: "document",
    fieldsets: [
        { name: "hubspotIds", title: "Hubspot IDs" },
        { name: "descriptions", title: "Descriptions" },
    ],
    fields: [
        ...Object.entries(forms).map(([id, title]) =>
            defineField({
                fieldset: "hubspotIds",
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

export const hubspotFormIDFieldName = "hubspotFormID";

export const hubspotFormIDField = defineField({
    name: hubspotFormIDFieldName,
    title: "Hubspot Form ID",
    type: "string",
    validation: requiredRule,
});

export const formSchemas = [formsSchema];

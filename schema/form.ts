import { defineField, defineType, SanityDocument } from "@sanity/types";
import { requiredRule } from "./common-fields";

export const forms = {
    contact: "Contact",
    newsletter: "Newsletter",
    typeDBCloudWaitlist: "TypeDB Cloud Waitlist",
    webinarRegistration: "Webinar Registration",
    whitePaperDownload: "White Paper Download",
    requestTechTalk: "Request Tech Talk",
} as const;

export const formList = Object.entries(forms).map(([id, title]) => ({ value: id, title: title }));

export type FormID = keyof typeof forms;

export type SanityHubspotForms = SanityDocument & { [key in FormID]: string; };

export interface WebinarRegistrationForm {
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
    title: "HubSpot Forms",
    type: "document",
    fields: [
        ...Object.entries(forms).map(([id, title]) => defineField({
            name: id,
            title: `${title} Form ID`,
            type: "string",
            validation: requiredRule,
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

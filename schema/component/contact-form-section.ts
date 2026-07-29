import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import {
    isVisibleField, sectionTextAlignField, sectionWidthField, titleBodyActionsFields, titleWithHighlightsPreview,
} from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SanitySectionCore, SectionCore } from "./section";

export const contactFormSectionSchemaName = "contactFormSection";

export const contactFormVariants = [
    { title: "Standard", value: "default" },
    { title: "Enterprise", value: "enterprise" },
] as const;

export type ContactFormVariant = (typeof contactFormVariants)[number]["value"];

export interface SanityContactFormSection extends SanitySectionCore {
    variant?: ContactFormVariant;
}

export class ContactFormSection extends SectionCore {
    readonly variant: ContactFormVariant;

    constructor(props: PropsOf<ContactFormSection>) {
        super(props);
        this.variant = props.variant;
    }

    static override fromSanity(data: SanityContactFormSection, db: SanityDataset) {
        return new ContactFormSection(Object.assign(SectionCore.fromSanity(data, db), {
            variant: data.variant || "default",
        }));
    }
}

const contactFormSectionSchema = defineType({
    name: contactFormSectionSchemaName,
    title: "Contact Form Section",
    icon: EnvelopeIcon,
    type: "object",
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "variant",
            title: "Form Variant",
            type: "string",
            description: "Enterprise uses more formal field labels, e.g. 'Business Email' in place of 'Email'",
            options: { layout: "radio", direction: "horizontal", list: [...contactFormVariants] },
            initialValue: "default",
        }),
        sectionWidthField,
        sectionTextAlignField,
        isVisibleField,
    ],
    preview: {
        select: { title: "title", variant: "variant" },
        prepare: (selection) => ({
            title: titleWithHighlightsPreview(selection.title),
            subtitle: `Contact Form${selection.variant === "enterprise" ? " (Enterprise)" : ""}`,
        }),
    },
});

export const contactFormSectionSchemas = [contactFormSectionSchema];

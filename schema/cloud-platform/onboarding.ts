import { DiamondIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { titleFieldWithHighlights } from "../common-fields";
import { PortableText } from "../text";

export interface CloudOnboarding {
    title: PortableText;
    createProfileText?: PortableText;
    projectInfoText?: PortableText;
    joinOrgText?: PortableText;
}

export const cloudOnboardingSchemaName = "cloudOnboarding";

const onboardingSchema = defineType({
    name: cloudOnboardingSchemaName,
    title: "Cloud Onboarding",
    icon: DiamondIcon,
    type: "document",
    fields: [
        titleFieldWithHighlights,
        defineField({
            name: "createProfileText",
            title: "Create Profile Text",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "projectInfoText",
            title: "Project Info Text",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "joinOrgText",
            title: "Join Organization Text",
            type: "array",
            of: [{ type: "block" }],
        }),
    ],
    preview: {
        prepare: () => ({ title: "Onboarding" }),
    },
});

export const onboardingSchemas = [onboardingSchema];

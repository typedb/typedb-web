import { defineField, defineType } from "@sanity/types";

export const socialMedias = {
    discord: "Discord",
    meetup: "Meetup",
    twitter: "Twitter",
    youtube: "YouTube",
    linkedIn: "LinkedIn",
} as const;

export const socialMediaList = Object.keys(socialMedias);

export type SocialMediaID = keyof typeof socialMedias;

export const socialMediaLinksField = defineField({
    name: "socialMediaLinks",
    title: "Social Media Links",
    type: "array",
    of: [{type: "string"}],
    options: {
        layout: "grid",
        list: Object.entries(socialMedias).map(([id, title]) => ({ value: id, title: title })),
    },
});

export const communityResourcesSchemaName = "communityResources";

export const communityResourcesSchema = defineType({
    name: communityResourcesSchemaName,
    title: "Community Resources",
    type: "document",
    fieldsets: [
        { name: "social", title: "Social Media" },
        { name: "other", title: "Other" },
    ],
    fields: [
        defineField({
            name: "githubURL",
            title: "GitHub URL",
            type: "url",
        }),
        defineField({
            name: "discussionForumURL",
            title: "Discussion Forum URL",
            type: "url",
        }),
        defineField({
            name: "stackOverflowURL",
            title: "Stack Overflow URL",
            type: "url",
        }),
        defineField({
            name: "enterpriseSupportURL",
            title: "Enterprise Support URL",
            type: "url",
        }),
        ...Object.entries(socialMedias).map(([id, title]) => defineField({
            name: `${id}URL`,
            title: `${title} URL`,
            type: "url",
        })),
    ],
    preview: { prepare: (_selection) => ({ title: "Community Resources" }) },
});

export const socialMediaSchemas = [communityResourcesSchema];

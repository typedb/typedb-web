import { defineField, defineType, SanityDocument } from "@sanity/types";
import { Link } from "./link";
import { SanityDataset } from "./sanity-core";

export const socialMedias = {
    discord: "Discord",
    meetup: "Meetup",
    twitter: "Twitter",
    youtube: "YouTube",
    linkedin: "LinkedIn",
} as const;

export const socialMediaList = Object.keys(socialMedias);

export type SocialMediaID = keyof typeof socialMedias;

export interface SanityCommunityResources extends SanityDocument {
    githubURL: string;
    discussionForumURL: string;
    stackOverflowURL: string;
    enterpriseSupportURL: string;
    discordURL: string;
    meetupURL: string;
    twitterURL: string;
    youtubeURL: string;
    linkedinURL: string;
}

export class SocialMediaLink {
    readonly id: SocialMediaID;
    readonly text: string;
    readonly iconURL: string;
    readonly link: Link;

    constructor(id: SocialMediaID, db: SanityDataset) {
        this.id = id;
        this.text = socialMedias[id];
        this.iconURL = `/assets/icon/social/${id}-rectangle.svg`;
        const communityResources = db.getDocumentByID("communityResources") as SanityCommunityResources;
        this.link = new Link({ destination: communityResources[`${id}URL`] || "", type: "external", opensNewTab: true });
    }
}

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
    groups: [
        { name: "developerAndSupport", title: "Developer / Support Platforms" },
        { name: "socialMedia", title: "Social Media" },
    ],
    fields: [
        defineField({
            name: "githubURL",
            title: "GitHub URL",
            type: "url",
            group: "developerAndSupport",
        }),
        defineField({
            name: "discussionForumURL",
            title: "Discussion Forum URL",
            type: "url",
            group: "developerAndSupport",
        }),
        defineField({
            name: "stackOverflowURL",
            title: "Stack Overflow URL",
            type: "url",
            group: "developerAndSupport",
        }),
        defineField({
            name: "enterpriseSupportURL",
            title: "Enterprise Support URL",
            type: "url",
            group: "developerAndSupport",
        }),
        ...Object.entries(socialMedias).map(([id, title]) => defineField({
            name: `${id}URL`,
            title: `${title} URL`,
            type: "url",
            group: "socialMedia",
        })),
    ],
    preview: { prepare: (_selection) => ({ title: "Community Resources" }) },
});

export const socialMediaSchemas = [communityResourcesSchema];

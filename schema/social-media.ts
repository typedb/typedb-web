import { defineField, defineType, SanityDocument } from "@sanity/types";
import { Document } from "./sanity-core/document";

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

export class CommunityResources extends Document implements Omit<SanityCommunityResources, keyof SanityDocument> {
    readonly discordURL: string;
    readonly discussionForumURL: string;
    readonly enterpriseSupportURL: string;
    readonly githubURL: string;
    readonly linkedinURL: string;
    readonly meetupURL: string;
    readonly stackOverflowURL: string;
    readonly twitterURL: string;
    readonly youtubeURL: string;

    constructor(data: SanityCommunityResources) {
        super(data);
        this.discordURL = data.discordURL;
        this.discussionForumURL = data.discussionForumURL;
        this.enterpriseSupportURL = data.enterpriseSupportURL;
        this.githubURL = data.githubURL;
        this.linkedinURL = data.linkedinURL;
        this.meetupURL = data.meetupURL;
        this.stackOverflowURL = data.stackOverflowURL;
        this.twitterURL = data.twitterURL;
        this.youtubeURL = data.youtubeURL;
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

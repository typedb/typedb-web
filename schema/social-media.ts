export const socialMedias = {
    discord: "Discord",
    meetup: "Meetup",
    twitter: "Twitter",
    youtube: "YouTube",
    linkedIn: "LinkedIn",
} as const;

export const socialMediaList = Object.keys(socialMedias);

export type SocialMediaID = keyof typeof socialMedias;

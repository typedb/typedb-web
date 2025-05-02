import { ConfettiIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { linkFieldOptional, requiredRule, titleField } from "../common-fields";
import { Link, SanityLink } from "../link";
import { SanityReference } from "../sanity-core";

export interface CloudAnnouncement {
    isEnabled: boolean;
    title: string;
    subtitle: string;
    link?: Link;
    id: string;
}

export interface SanityCloudAnnouncement {
    isEnabled: boolean;
    title: string;
    subtitle: string;
    link?: SanityReference<SanityLink>;
    id: string;
}

export const cloudAnnouncementSchemaName = "cloudAnnouncement";

const announcementSchema = defineType({
    name: cloudAnnouncementSchemaName,
    title: "Cloud Announcement",
    icon: ConfettiIcon,
    type: "document",
    fields: [
        defineField({
            name: "isEnabled",
            title: "Is Enabled",
            type: "boolean",
            initialValue: false,
            validation: requiredRule,
        }),
        titleField,
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
            validation: requiredRule,
        }),
        linkFieldOptional,
        defineField({
            name: "id",
            title: "ID",
            type: "string",
            validation: requiredRule,
        }),
    ],
    preview: {
        prepare: () => ({ title: "Announcement" }),
    },
});

export const announcementSchemas = [announcementSchema];

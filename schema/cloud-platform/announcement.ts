import { ConfettiIcon, DiamondIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { titleFieldWithHighlights } from "../common-fields";
import { PortableText } from "../text";

export interface CloudAnnouncement {
    isEnabled: boolean;
    title: string;
    subtitle: string;
    link: string;
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
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
        }),
        defineField({
            name: "link",
            title: "Link",
            type: "string",
        }),
        defineField({
            name: "id",
            title: "ID",
            type: "string",
        }),
    ],
    preview: {
        prepare: () => ({ title: "Announcement" }),
    },
});

export const announcementSchemas = [announcementSchema];

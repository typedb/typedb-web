import { ConfettiIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { linkFieldOptional, requiredRule, titleField } from "../common-fields";
import { Link } from "../link";

export interface CloudAnnouncement {
    isEnabled: boolean;
    title: string;
    subtitle: string;
    link?: Link;
    id: string;
}

export const cloudAnnouncementSchemaName = "cloudAnnouncement";
export const cloudAnnouncementQuery = `
{
  "cloudAnnouncement": *[(_type match '${cloudAnnouncementSchemaName}')][0]{
    isEnabled,
    isEnabled == true => {
      link->{ type, opensNewTab, destination{current} },
      "spans": text[0].children[_type=='span']{
        text, marks
      }
    }
  }
}
`;

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

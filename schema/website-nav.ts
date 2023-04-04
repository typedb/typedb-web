import { BlockElementIcon, LinkIcon, MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { linkField, titleField, titleFieldName, videoURLField } from "./common-fields";

const listColumnItemSchema = defineType({
    name: "topbarListColumnItem",
    title: "List Column Item",
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "description",
            type: "string",
        }),
        linkField,
    ],
    preview: {
        select: { title: "title", description: "description", link: "link.title" },
        prepare: (selection) => ({ title: selection.title, subtitle: `[${selection.link}] ${selection.description}` }),
    },
});

const listColumnSchema = defineType({
    name: "topbarListColumn",
    title: "List Column",
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "links",
            type: "array",
            of: [{type: "topbarListColumnItem"}],
            initialValue: [],
        })
    ],
    preview: {
        select: { title: titleFieldName, links: "links" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: `${selection.links?.map((x: any) => x.title).join(", ") || ""}`,
        }),
    },
});

const videoColumnSchema = defineType({
    name: "topbarVideoColumn",
    title: "Video Column",
    type: "object",
    fields: [
        titleField,
        videoURLField,
    ],
});

const topbarMenuPanelSchema = defineType({
    name: "topbarMenuPanel",
    title: "Menu Panel",
    icon: MasterDetailIcon,
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "columns",
            type: "array",
            of: [{type: "topbarListColumn"}, {type: "topbarVideoColumn"}],
        }),
    ],
    preview: {
        select: { title: titleFieldName, columns: "columns" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: `${selection.columns?.map((x: any) => x.title).join(", ") || ""}`,
        }),
    },
});

const singleLinkSchema = defineType({
    name: "topbarSingleLink",
    title: "Single Link",
    icon: LinkIcon,
    type: "object",
    fields: [
        titleField,
        linkField,
    ],
    preview: {
        select: {
            title: titleFieldName,
            routeName: "link.route.current", routeTo: "link.title",
            externalLinkName: "link.title", externalLinkURL: "link.destination"
        },
        prepare: (selection) => {
            const subtitle = selection.routeName
                ? `${selection.routeName} (${selection.routeTo})`
                : selection.externalLinkName
                    ? `${selection.externalLinkName} (${selection.externalLinkURL})`
                    : "(unset)";
            return { title: selection.title, subtitle: subtitle };
        },
    },
});

const topbarItemTypes = [{type: "topbarMenuPanel"}, {type: "topbarSingleLink"},/* {type: "topbarImageLink"}*/];

export const topbarSchemaName = "topbar";

const topbarSchema = defineType({
    name: topbarSchemaName,
    icon: BlockElementIcon,
    type: "document",
    fields: [
        defineField({
            name: "mainArea",
            title: "Left Side Items",
            description: "Displayed at the top on mobile",
            type: "array",
            of: topbarItemTypes,
        }),
        defineField({
            name: "secondaryArea",
            title: "Right Side Items",
            description: "Displayed at the bottom on mobile",
            type: "array",
            of: topbarItemTypes,
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "Topbar" }),
    },
});

export const websiteNavSchemas = [listColumnItemSchema, listColumnSchema, videoColumnSchema, topbarMenuPanelSchema, singleLinkSchema, topbarSchema];

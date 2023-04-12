import { BlockElementIcon, LinkIcon, MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType } from "@sanity/types";
import { textLinkSchemaName } from "../link";
import { linkField, titleField, titleFieldName, videoEmbedField } from "../common-fields";

const descriptionField = defineField({
    name: "description",
    title: "Description",
    type: "string",
});

const listColumnItemSchema = defineType({
    name: "topbarListColumnItem",
    title: "List Column Item",
    type: "object",
    fields: [
        titleField,
        descriptionField,
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
            name: "items",
            description: "Items",
            type: "array",
            of: [{type: "topbarListColumnItem"}],
        }),
    ],
    preview: {
        select: { title: titleFieldName, items: "items" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: `${selection.items?.map((x: any) => x.title).join(", ") || ""}`,
        }),
    },
});

const videoColumnSchema = defineType({
    name: "topbarVideoColumn",
    title: "Video Column",
    type: "object",
    fields: [
        titleField,
        videoEmbedField,
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
            externalLinkName: "link.title", externalLinkURL: "link.destination.current"
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

export const topbarSchemaName = "topbar";

const secondaryAreaSchemaName = `${topbarSchemaName}_secondaryArea`;

const secondaryAreaSchema = defineType({
    name: secondaryAreaSchemaName,
    title: "Right Side Items",
    type: "object",
    fields: [
        defineField({
            name: "links",
            title: "Links",
            type: "array",
            of: [{type: "topbarSingleLink"}],
        }),
        defineField({
            name: "button",
            title: "Button",
            type: textLinkSchemaName,
        }),
    ],
});

const topbarItemTypes = [{type: "topbarMenuPanel"}, {type: "topbarSingleLink"}];

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
            description: "Displayed at the bottom on mobile (GitHub link is always displayed)",
            type: secondaryAreaSchemaName,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Topbar" }) },
});

export const topbarSchemas = [listColumnItemSchema, listColumnSchema, videoColumnSchema, topbarMenuPanelSchema, secondaryAreaSchema, singleLinkSchema, topbarSchema];

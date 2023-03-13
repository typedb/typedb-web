import { BlockElementIcon, LinkIcon, MasterDetailIcon } from "@sanity/icons";
import { defineField, defineType, ReferenceRule, StringRule } from "sanity";

const abstractBlockSchema = defineType({
    name: "topbarAbstractBlock",
    type: "object",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
    ],
});

const listBlockItemSchema = defineType({
    name: "topbarListBlockItem",
    title: "List Block Item",
    type: "object",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "description",
            type: "string",
        }),
        defineField({
            name: "link",
            type: "reference",
            to: [{type: "page"}, {type: "externalLink"}],
            validation: (rule: ReferenceRule) => rule.required(),
        }),
    ],
    preview: {
        select: { title: "title", description: "description", link: "link.title" },
        prepare: (selection) => ({ title: selection.title, subtitle: `[${selection.link}] ${selection.description}` }),
    },
});

const listBlockSchema = defineType({
    name: "topbarListBlock",
    title: "List Block",
    type: abstractBlockSchema.type,
    fields: [
        ...abstractBlockSchema.fields,
        defineField({
            name: "links",
            type: "array",
            of: [{type: "topbarListBlockItem"}],
            initialValue: [],
        })
    ],
    preview: {
        select: { title: "title", links: "links" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: `${selection.links?.map((x: any) => x.title).join(", ") || ""}`,
        }),
    },
});

const videoBlockSchema = defineType({
    name: "topbarVideoBlock",
    title: "Video Block",
    type: abstractBlockSchema.type,
    fields: [
        ...abstractBlockSchema.fields,
        defineField({
            name: "videoURL",
            type: "url",
        }),
    ],
});

const expandableItemSchema = defineType({
    name: "topbarExpandableItem",
    title: "Expandable Item",
    icon: MasterDetailIcon,
    type: "object",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "menuBlocks",
            description: "Displayed on touching the item on mobile/tablet, and on hovering the item on desktop",
            type: "array",
            of: [{type: "topbarListBlock"}, {type: "topbarVideoBlock"}],
        }),
    ],
    preview: {
        select: { title: "title", menuBlocks: "menuBlocks" },
        prepare: (selection) => ({
            title: selection.title,
            subtitle: `${selection.menuBlocks?.map((x: any) => x.title).join(", ") || ""}`,
        }),
    },
});

const singleLinkSchema = defineType({
    name: "topbarSingleLink",
    title: "Single Link",
    icon: LinkIcon,
    type: "object",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "link",
            type: "reference",
            to: [{ type: "page" }, { type: "externalLink" }],
            validation: (rule: ReferenceRule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title",
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

const topbarItemTypes = [{type: "topbarExpandableItem"}, {type: "topbarSingleLink"},/* {type: "topbarImageLink"}*/];

const topbarSchema = defineType({
    name: "topbar",
    type: "object",
    fields: [
        defineField({
            name: "logo",
            type: "image",
        }),
        defineField({
            name: "mainArea",
            description: "Displayed at the top on mobile, and on the left on tablet & desktop",
            type: "array",
            of: topbarItemTypes,
        }),
        defineField({
            name: "secondaryArea",
            description: "Displayed at the bottom on mobile, and on the right on tablet & desktop",
            type: "array",
            of: topbarItemTypes,
        }),
    ],
});

const headerAndFooterSchema = defineType({
    name: "topbarAndFooter",
    icon: BlockElementIcon,
    type: "document",
    fields: [
        defineField({
            name: "topbar",
            type: "topbar",
        }),
        // defineField({
        //     name: "footer",
        //     type: "footer",
        // }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "Topbar & Footer" }),
    },
});

export const websiteNavSchemas = [listBlockItemSchema, listBlockSchema, videoBlockSchema, expandableItemSchema, singleLinkSchema, topbarSchema, headerAndFooterSchema];

import { StackCompactIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, ReferenceRule, StringRule } from "sanity";

const commonFields = [
    defineField({
        name: "title",
        title: "Title",
        description: "Text marked as 'bold' will instead be rendered in this section's theme color",
        type: "array",
        of: [{type: "block"}],
        validation: (rule: ArrayRule<any>) => rule.required().custom((value, _context) => {
            return value?.length === 1 ? true : "Must contain exactly one paragraph";
        }),
    }),
    defineField({
        name: "body",
        title: "Body",
        description: "Text marked as 'bold' will instead be rendered in this section's theme color",
        type: "array",
        of: [{type: "block"}],
        validation: (rule: ArrayRule<any>) => rule.required(),
    }),
    defineField({
        name: "themeColor",
        title: "Theme Color",
        type: "reference",
        to: [{type: "themeColor"}],
        validation: (rule: ReferenceRule) => rule.required(),
    }),
];

const backgroundImageField = defineField({
    name: "backgroundImage",
    title: "Background Image",
    type: "image",
});

const visualContentField = defineField({
    name: "visualContent",
    title: "Visual content (diagrams, bullet points, etc.)",
    type: "reference",
    to: [{type: "organisationLogosPanel"}, {type: "keyPointPanels"}],
});

const optionalActionsField = defineField({
    name: "actions",
    title: "Actions (optional)",
    type: "actions",
});

const customCSSField = defineField({
    name: "customCSSClasses",
    title: "Custom CSS Classes (optional)",
    description: "Applied to the root element of this block. Space-separated.",
    type: "string",
});

const technicolorBlockPreview = {
    select: { title: "title", visualContent: "visualContent.name" },
    prepare: (selection: any) => ({
        title: selection.title[0].children.map((x: any) => x.text).join("") as string,
        subtitle: selection.visualContent,
    }),
};

const blockSchema = defineType({
    name: "technicolorBlock",
    title: "Block",
    type: "object",
    fields: [
        ...commonFields,
        backgroundImageField,
        visualContentField,
        optionalActionsField,
        customCSSField,
    ],
    preview: technicolorBlockPreview,
});

const firstBlockSchema = defineType({
    name: "technicolorFirstBlock",
    title: "First Block",
    type: "object",
    fields: [
        ...commonFields,
        Object.assign({}, backgroundImageField, { description: "Displayed above title" }),
        Object.assign({}, optionalActionsField, { description: "Displayed between body and visual content" }),
        visualContentField,
        customCSSField,
    ],
    preview: technicolorBlockPreview,
});

const blockChainSchema = defineType({
    name: "technicolorBlockChain",
    title: "Technicolor Block Chain",
    icon: StackCompactIcon,
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "firstBlock",
            title: "First Block",
            type: "technicolorFirstBlock",
        }),
        defineField({
            name: "otherBlocks",
            title: "Other Blocks",
            type: "array",
            of: [{"type": "technicolorBlock"}],
            validation: (rule: ArrayRule<any>) => rule.required(),
        }),
    ],
    preview: {
        select: { name: "name" },
        prepare: (selection) => ({
            title: selection.name,
            subtitle: "Technicolor Block Chain",
        }),
    },
});

export const technicolorBlockChainSchemas = [blockSchema, firstBlockSchema, blockChainSchema];

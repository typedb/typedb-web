import { StackCompactIcon } from "@sanity/icons";
import { ArrayRule, Asset, BlockDefinition, defineField, defineType, Image, Reference, ReferenceRule, SanityDocument, StringRule } from "@sanity/types";

import { ThemeColor } from "./color";
import { bodyFieldName, nameField, nameFieldName, titleFieldName } from "./common-fields";
import { Document } from "./document";
import { SanityDataset } from "./sanity-core";
import { OrganisationLogosPanel } from "./organisation-logos-panel";
import { ParagraphWithHighlights } from "./text";

interface CommonFields {
    title: ParagraphWithHighlights;
    body: ParagraphWithHighlights;
    themeColor: ThemeColor;
    backgroundImageURL?: string;
    // TODO: custom CSS for nebula
    // width: calc(384px + 80vw);
    //     margin-left: calc(5vw - 96px);
    //     margin-top: calc(1vw - 19.2px);
    visualContent?: VisualContent;
    /* actions: Actions; */
    customCSSClasses?: string;
}

type VisualContent = OrganisationLogosPanel /*| KeyPointPanels */;

interface SanityTechnicolorBlock {
    title: any[];
    body: any[];
    themeColor: Reference;
    backgroundImage?: Image;
    visualContent?: Reference;
    customCSSClasses?: string;
}

function parseCommonFields(data: SanityTechnicolorBlock, db: SanityDataset): CommonFields {
    return {
        title: new ParagraphWithHighlights(data.title),
        body: new ParagraphWithHighlights(data.body),
        themeColor: new ThemeColor(db.resolveReference(data.themeColor)),
        backgroundImageURL: data.backgroundImage ? db.resolveReference<Asset>(data.backgroundImage.asset!).url : undefined,
        visualContent: data.visualContent ? new OrganisationLogosPanel(db.resolveReference(data.visualContent), db) : undefined,
        customCSSClasses: data.customCSSClasses,
    };
}

export class TechnicolorBlock implements CommonFields {
    readonly title: ParagraphWithHighlights;
    readonly body: ParagraphWithHighlights;
    readonly themeColor: ThemeColor;
    readonly backgroundImageURL?: string;
    readonly visualContent?: VisualContent;
    readonly customCSSClasses?: string;

    constructor(data: SanityTechnicolorBlock, db: SanityDataset) {
        const commonFields = parseCommonFields(data, db);
        this.title = commonFields.title;
        this.body = commonFields.body;
        this.themeColor = commonFields.themeColor;
        this.backgroundImageURL = commonFields.backgroundImageURL;
        this.visualContent = commonFields.visualContent;
        this.customCSSClasses = commonFields.customCSSClasses;
    }
}

interface SanityTechnicolorBlockChain extends SanityDocument {
    firstBlock: SanityTechnicolorBlock;
    otherBlocks: SanityTechnicolorBlock[];
}

export class TechnicolorBlockChain extends Document {
    readonly firstBlock: TechnicolorBlock;
    readonly blocks: TechnicolorBlock[];

    constructor(data: SanityTechnicolorBlockChain, db: SanityDataset) {
        super(data);
        [this.firstBlock, this.blocks] = [
            new TechnicolorBlock(data.firstBlock, db),
            data.otherBlocks.map((x: any) => new TechnicolorBlock(x, db))
        ];
    }
}

const commonFields = [
    defineField({
        name: titleFieldName,
        title: "Title",
        description: "Text marked as 'bold' will instead be rendered in this section's theme color",
        type: "array",
        of: [{type: "block"}],
        validation: (rule: ArrayRule<any>) => rule.required().custom((value, _context) => {
            return value?.length === 1 ? true : "Must contain exactly one paragraph";
        }),
    }),
    defineField({
        name: bodyFieldName,
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
        nameField,
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
        select: { name: nameFieldName },
        prepare: (selection) => ({
            title: selection.name,
            subtitle: "Technicolor Block Chain",
        }),
    },
});

export const technicolorBlockChainSchemas = [blockSchema, firstBlockSchema, blockChainSchema];

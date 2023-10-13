import { BlockContentIcon, InlineIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { Illustration, illustrationFieldTargetTypes, illustrationFromSanity, SanityIllustration } from "../illustration";
import {
    isVisibleField, nameField, nameFieldOptional,
    optionalActionsField,
    requiredRule, SanityIconField,
    SanityVisibleToggle, sectionIconFieldOptional,
    sectionIdField,
    titleBodyIconFields, titleFieldOptional,
} from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { RichText, SanityPortableText, SanityTitleField } from "../text";
import { PropsOf } from "../util";
import { FeatureGrid, featureGridSchemaName, SanityFeatureGrid } from "./feature-grid";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";

export interface SanityPublicationTextBlock extends SanityDocument { // required as we can't mix primitive + object types in Sanity union types
    content: SanityPortableText;
}

export type SanityPublicationContentRowItem = SanityPublicationTextBlock | SanityIllustration;

function isTextBlock(item: SanityPublicationContentRowItem): item is SanityPublicationTextBlock {
    return item._type === publicationTextBlockSchemaName;
}

export interface SanityPublicationContentRow extends SanityDocument, Partial<SanityTitleField & SanityIconField> {
    item1?: SanityReference<SanityPublicationContentRowItem>;
    item2?: SanityReference<SanityPublicationContentRowItem>;
}

export type SanityPublicationItem = SanityPublicationContentRow | SanityFeatureGrid;

function isContentRow(item: SanityPublicationItem): item is SanityPublicationContentRow {
    return item._type === publicationContentRowSchemaName;
}

export interface SanityPublicationSection extends SanityTechnicolorBlock, SanityVisibleToggle {
    panelItems: SanityPublicationItem[];
}

export type PublicationContentRowItem = RichText | Illustration;

export function isRichText(item: PublicationContentRowItem): item is RichText {
    return "paragraphs" in item;
}

function contentRowItemFromSanity(data: SanityReference<SanityPublicationContentRowItem>, db: SanityDataset): PublicationContentRowItem {
    const resolvedData = db.resolveRef(data);
    if (isTextBlock(resolvedData)) return RichText.fromSanity(resolvedData.content);
    else return illustrationFromSanity(resolvedData, db);
}

export class PublicationContentRow {
    readonly title?: string;
    readonly iconURL?: string;
    readonly item1?: PublicationContentRowItem;
    readonly item2?: PublicationContentRowItem;

    constructor(props: PropsOf<PublicationContentRow>) {
        this.title = props.title;
        this.iconURL = props.iconURL;
        this.item1 = props.item1;
        this.item2 = props.item2;
    }

    static fromSanity(data: SanityPublicationContentRow, db: SanityDataset): PublicationContentRow {
        return new PublicationContentRow({
            title: data.title,
            iconURL: data.icon && db.resolveImageRef(data.icon).url,
            item1: data.item1 && contentRowItemFromSanity(data.item1, db),
            item2: data.item2 && contentRowItemFromSanity(data.item2, db),
        });
    }

    items(): PublicationContentRowItem[] {
        return [this.item1, this.item2].filter(x => !!x) as PublicationContentRowItem[];
    }
}

export type PublicationPanelItem = PublicationContentRow | FeatureGrid;

function publicationItemFromSanity(data: SanityPublicationItem, db: SanityDataset): PublicationPanelItem {
    if (isContentRow(data)) return PublicationContentRow.fromSanity(data, db);
    else return FeatureGrid.fromSanity(data, db);
}

export class PublicationSection extends TechnicolorBlock {
    readonly panelItems: PublicationPanelItem[];

    constructor(props: PropsOf<PublicationSection>) {
        super(props);
        this.panelItems = props.panelItems;
    }

    static override fromSanity(data: SanityPublicationSection, db: SanityDataset) {
        return new PublicationSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                panelItems: data.panelItems.map(x => publicationItemFromSanity(x, db)),
            })
        );
    }
}

const publicationSchemaName = "publication";

export const publicationTextBlockSchemaName = `${publicationSchemaName}_textBlock`;

const publicationTextBlockSchema = defineType({
    name: publicationTextBlockSchemaName,
    title: "Text Block",
    type: "document",
    icon: BlockContentIcon,
    fields: [
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [{type: "block"}],
            validation: requiredRule,
        }),
    ],
});

export const publicationContentRowSchemaName = `${publicationSchemaName}_contentRow`;

const publicationContentRowSchema = defineType({
    name: publicationContentRowSchemaName,
    title: "Content Row",
    type: "document",
    icon: InlineIcon,
    fields: [
        Object.assign({}, nameFieldOptional, { description: "For reference only - not visible to users" }),
        titleFieldOptional,
        sectionIconFieldOptional,
        defineField({
            name: "item1",
            title: "Left Side Item",
            type: "reference",
            to: [{ type: publicationTextBlockSchemaName }, ...illustrationFieldTargetTypes],
        }),
        defineField({
            name: "item2",
            title: "Right Side Item (optional)",
            type: "reference",
            to: [{ type: publicationTextBlockSchemaName }, ...illustrationFieldTargetTypes],
        }),
    ],
    preview: {
        select: { name: "name", title: "title" },
        prepare: (selection) => ({
            title: selection.name || selection.title,
        }),
    },
});

export const publicationSectionSchemaName = "publicationSection";

const publicationSectionSchema = defineType({
    name: publicationSectionSchemaName,
    title: `Publication Section`,
    type: "object",
    fields: [
        ...titleBodyIconFields,
        optionalActionsField,
        sectionIdField,
        defineField({
            name: "panelItems",
            title: "Panel - Items",
            type: "array",
            of: [{ type: publicationContentRowSchemaName }, { type: featureGridSchemaName }],
            validation: requiredRule,
        }),
        isVisibleField,
    ],
});

export const publicationSchemas = [publicationTextBlockSchema, publicationContentRowSchema, publicationSectionSchema];

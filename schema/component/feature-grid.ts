import { DashboardIcon } from "@sanity/icons";
import { ArrayRule, defineField, defineType, SanityDocument } from "@sanity/types";
import { codeSnippetSchemaName, CodeSnippetShort, codeSnippetShortSchemaName, isCodeSnippetShort, polyglotSnippetSchemaName } from "../code";
import { bodyFieldRichText, descriptionField, isVisibleField, linkField, nameField, requiredRule, SanityVisibleToggle, sectionIconField, sectionIconFieldOptional, sectionIdField, titleField, titleFieldWithHighlights } from "../common-fields";
import { graphVisualisationSchemaName, Illustration, illustrationFieldOptional, illustrationFromSanity, imageIllustrationSchemaName, SanityIllustration, splitPaneIllustrationSchemaName, videoEmbedSchemaName } from "../illustration";
import { SanityImageRef } from "../image";
import { Link, SanityLink, SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import { SanityDataset, SanityReference } from "../sanity-core";
import { RichText, SanityPortableText } from "../text";
import { PropsOf } from "../util";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";

export interface SanityFeatureGridSection extends SanityTechnicolorBlock, SanityVisibleToggle {
    featureGrid: SanityReference<SanityFeatureGrid>;
}

export type FeatureGridLayout = "textCodeBlocks" | "textBlocks" | "tabs";

export interface SanityFeatureGrid extends SanityDocument {
    featureGridLayout: FeatureGridLayout;
    features: SanityFeatureGridCell[];
    illustration?: SanityReference<SanityIllustration>;
    columnCount: number;
}

export interface SanityFeatureGridCell extends SanityVisibleToggle {
    title: string;
    body: SanityPortableText;
    icon?: SanityReference<SanityImageRef>;
    links?: SanityTextLink[];
    illustration?: SanityReference<SanityIllustration>;
    tags: string[];
    isIllustrationBlurred: boolean;
}

export function featureGridIllustrationFromSanity(data: SanityIllustration, db: SanityDataset): Illustration {
    if (isCodeSnippetShort(data)) return CodeSnippetShort.fromSanity(data);
    else return illustrationFromSanity(data, db);
}

export class FeatureGridCell {
    readonly title: string;
    readonly body?: RichText;
    readonly iconURL?: string;
    readonly links?: TextLink[];
    readonly illustration?: Illustration;
    readonly tags: string[];
    readonly isIllustrationBlurred: boolean;

    constructor(props: PropsOf<FeatureGridCell>) {
        this.title = props.title;
        this.body = props.body;
        this.iconURL = props.iconURL;
        this.links = props.links;
        this.illustration = props.illustration;
        this.tags = props.tags;
        this.isIllustrationBlurred = props.isIllustrationBlurred;
    }

    static fromSanity(data: SanityFeatureGridCell, db: SanityDataset) {
        return new FeatureGridCell({
            title: data.title,
            body: data.body && RichText.fromSanity(data.body),
            iconURL: data.icon && db.resolveImageRef(data.icon).url,
            links: data.links?.map(x => TextLink.fromSanityTextLink(x, db)).filter(x => !!x) as TextLink[],
            illustration: data.illustration && featureGridIllustrationFromSanity(db.resolveRef(data.illustration), db),
            tags: data.tags,
            isIllustrationBlurred: data.isIllustrationBlurred,
        });
    }
}

export class FeatureGridSection extends TechnicolorBlock {
    readonly featureGridLayout: FeatureGridLayout;
    readonly features: FeatureGridCell[][];
    readonly illustration?: Illustration;

    constructor(props: PropsOf<FeatureGridSection>) {
        super(props);
        this.featureGridLayout = props.featureGridLayout;
        this.features = props.features;
        this.illustration = props.illustration;
    }

    static override fromSanity(data: SanityFeatureGridSection, db: SanityDataset) {
        const featureGrid = db.resolveRef(data.featureGrid);
        const visibleFeatures = featureGrid.features.filter((x) => x.isVisible);
        const featureCells = [];
        for (let i = 0; i < visibleFeatures.length; i += featureGrid.columnCount) {
            const chunk = visibleFeatures.slice(i, i + featureGrid.columnCount).map((x) => FeatureGridCell.fromSanity(x, db));
            featureCells.push(chunk);
        }
        return new FeatureGridSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                featureGridLayout: featureGrid.featureGridLayout,
                features: featureCells,
                illustration: featureGrid.illustration
                    ? featureGridIllustrationFromSanity(db.resolveRef(featureGrid.illustration), db)
                    : undefined,
            })
        );
    }
}

export const featureGridCellSchemaName = `featureGridCell`;

const featureGridCellSchema = defineType({
    name: featureGridCellSchemaName,
    title: "Feature",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        sectionIconFieldOptional,
        defineField({
            name: "illustration",
            title: "Illustration",
            type: "reference",
            to: [
                { type: codeSnippetSchemaName }, { type: codeSnippetShortSchemaName},
                { type: polyglotSnippetSchemaName }, { type: imageIllustrationSchemaName },
                { type: graphVisualisationSchemaName }, { type: splitPaneIllustrationSchemaName },
                { type: videoEmbedSchemaName },
            ]
        }), // TODO: hide this field when block type is 'text only'
        defineField({
            name: "links",
            title: "Links",
            type: "array",
            of: [{type: textLinkSchemaName}],
            validation: (rule: ArrayRule<any>) => rule.max(2),
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            initialValue: [],
        }),
        defineField({
            name: "isIllustrationBlurred",
            title: "Blur Illustration?",
            type: "boolean",
            initialValue: false,
            validation: requiredRule,
        }),
        isVisibleField,
    ],
});

export const featureGridSchemaName = `featureGrid`;

const featureGridSchema = defineType({
    name: featureGridSchemaName,
    title: "Feature Grid",
    type: "document",
    icon: DashboardIcon,
    fields: [
        nameField,
        defineField({
            name: "layout",
            title: "Layout",
            type: "string",
            options: {
                layout: "dropdown",
                list: [
                    { title: "Text Blocks", value: "textBlocks" },
                    { title: "Text + Illustration Blocks", value: "textIllustrationBlocks" },
                ],
            },
            initialValue: "textBlocks",
            validation: requiredRule,
        }),
        defineField({
            name: "columnCount",
            title: "Column Count",
            type: "number",
            initialValue: 3,
        }),
        defineField({
            name: "features",
            title: "Features",
            type: "array",
            of: [{ type: featureGridCellSchemaName }],
            validation: (rule: ArrayRule<any>) => rule.required().min(2),
        }),
        illustrationFieldOptional,
    ],
});

export const featureGridSectionSchemaName = `featureGridSection`;

const featureGridSectionSchema = defineType({
    name: featureGridSectionSchemaName,
    title: "Feature Grid Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        sectionIconField,
        sectionIdField,
        defineField({
            name: "featureGrid",
            title: "Feature Grid",
            type: "reference",
            to: [{type: featureGridSchemaName}],
            validation: requiredRule,
        }),
        isVisibleField,
    ],
});

export const featureGridSchemas = [featureGridSchema, featureGridSectionSchema, featureGridCellSchema];

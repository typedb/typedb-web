import { ArrayRule, defineField, defineType } from "@sanity/types";
import { codeSnippetSchemaName, CodeSnippetShort, codeSnippetShortSchemaName, isCodeSnippetShort, polyglotSnippetSchemaName } from "../code";
import { bodyFieldRichText, isVisibleField, linkField, requiredRule, SanityVisibleToggle, sectionIconField, sectionIconFieldOptional, sectionIdField, titleField, titleFieldWithHighlights } from "../common-fields";
import { graphVisualisationSchemaName, Illustration, illustrationFieldOptional, illustrationFromSanity, imageIllustrationSchemaName, SanityIllustration, splitPaneIllustrationSchemaName, videoEmbedSchemaName } from "../illustration";
import { SanityImageRef } from "../image";
import { Link, SanityLink } from "../link";
import { SanityDataset, SanityReference } from "../sanity-core";
import { RichText, SanityPortableText } from "../text";
import { PropsOf } from "../util";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";

export interface SanityFeatureGridSection extends SanityTechnicolorBlock, SanityVisibleToggle {
    featureGridLayout: FeatureGridLayout;
    features: SanityFeatureGridCell[];
    illustration?: SanityReference<SanityIllustration>;
    columnCount: number;
}

export type FeatureGridLayout = "textCodeBlocks" | "textBlocks" | "tabs";

export interface SanityFeatureGridCell extends SanityVisibleToggle {
    title: string;
    body: SanityPortableText;
    icon?: SanityReference<SanityImageRef>;
    link?: SanityReference<SanityLink>;
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
    readonly link?: Link;
    readonly illustration?: Illustration;
    readonly tags: string[];
    readonly isIllustrationBlurred: boolean;

    constructor(props: PropsOf<FeatureGridCell>) {
        this.title = props.title;
        this.body = props.body;
        this.iconURL = props.iconURL;
        this.link = props.link;
        this.illustration = props.illustration;
        this.tags = props.tags;
        this.isIllustrationBlurred = props.isIllustrationBlurred;
    }

    static fromSanity(data: SanityFeatureGridCell, db: SanityDataset) {
        return new FeatureGridCell({
            title: data.title,
            body: data.body && RichText.fromSanity(data.body),
            iconURL: data.icon && db.resolveImageRef(data.icon).url,
            link: data.link && Link.fromSanityLinkRef(data.link, db),
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
        const visibleFeatures = data.features.filter((x) => x.isVisible);
        const featureCells = [];
        for (let i = 0; i < visibleFeatures.length; i += data.columnCount) {
            const chunk = visibleFeatures.slice(i, i + data.columnCount).map((x) => FeatureGridCell.fromSanity(x, db));
            featureCells.push(chunk);
        }
        return new FeatureGridSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                featureGridLayout: data.featureGridLayout,
                features: featureCells,
                illustration: data.illustration
                    ? featureGridIllustrationFromSanity(db.resolveRef(data.illustration), db)
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
        linkField,
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
            name: "columnCount",
            title: "Column Count",
            type: "number",
            initialValue: 3,
        }),
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
            name: "features",
            title: "Features",
            type: "array",
            of: [{ type: featureGridCellSchemaName }],
            validation: (rule: ArrayRule<any>) => rule.required().min(2),
        }),
        illustrationFieldOptional,
        isVisibleField,
    ],
});

export const featureGridSchemas = [featureGridSectionSchema, featureGridCellSchema];

import { ArrayRule, defineField, defineType } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { ContentTextPanel } from "../component/content-text-panel";
import { bodyFieldRichText, collapsibleOptions, isVisibleField, optionalActionsField, pageTitleField, requiredRule, sectionIconField, titleField, titleFieldWithHighlights } from "../common-fields";
import { SanityTechnicolorBlock, TechnicolorBlock } from "../component/technicolor-block";
import { Illustration, illustrationFieldOptional, illustrationFromSanity, SanityIllustration } from "../illustration";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { SanityDataset, SanityReference } from "../sanity-core";
import { RichText, SanityPortableText, SanityTitleBodyActions, TitleBodyActions } from "../text";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";

const introSection = "introSection";
const featureSections = "featureSections";
const finalSection = "finalSection";

export interface SanityFeaturesPage extends SanityPage {
    [introSection]: SanityIntroSection;
    [featureSections]: SanityFeatureSection[];
    [finalSection]: SanityConclusionSection;
}

interface SanityIntroSection extends SanityTitleBodyActions {
    userLogos: SanityReference<SanityOrganisation>[];
}

interface SanityFeatureSection extends SanityTechnicolorBlock {
    featureGridLayout: FeatureGridLayout;
    features: SanityFeatureGridCell[];
    illustration?: SanityReference<SanityIllustration>;
    columnCount: number;
}

export type FeatureGridLayout = "textCodeBlocks" | "textBlocks" | "tabs";

interface SanityFeatureGridCell {
    title: string;
    body: SanityPortableText;
    illustration?: SanityReference<SanityIllustration>;
}

export class FeaturesPage extends Page {
    readonly [introSection]: IntroSection;
    readonly [featureSections]: FeaturesPageFeatureSection[];
    readonly [finalSection]: ConclusionSection;

    constructor(data: SanityFeaturesPage, db: SanityDataset) {
        super(data);
        this.introSection = IntroSection.fromSanityIntroSection(data.introSection, db);
        this.featureSections = data.featureSections.map(x => FeaturesPageFeatureSection.fromSanity(x, db));
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

class IntroSection extends TitleBodyActions {
    readonly userLogos: Organisation[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.userLogos = props.userLogos;
    }

    static fromSanityIntroSection(data: SanityIntroSection, db: SanityDataset) {
        return Object.assign(TitleBodyActions.fromSanityTitleBodyActions(data, db), {
            userLogos: data.userLogos.map(x => new Organisation(db.resolveRef(x), db))
        });
    }
}

export class FeatureGridCell {
    readonly title: string;
    readonly body?: RichText;
    readonly illustration?: Illustration;

    constructor(props: PropsOf<FeatureGridCell>) {
        this.title = props.title;
        this.body = props.body;
        this.illustration = props.illustration;
    }

    static fromSanity(data: SanityFeatureGridCell, db: SanityDataset) {
        return new FeatureGridCell({
            title: data.title,
            body: data.body ? RichText.fromSanity(data.body) : undefined,
            illustration: data.illustration ? illustrationFromSanity(db.resolveRef(data.illustration), db) : undefined,
        });
    }
}

export class FeaturesPageFeatureSection extends TechnicolorBlock {
    readonly featureGridLayout: FeatureGridLayout;
    readonly features: FeatureGridCell[][];
    readonly illustration?: Illustration;

    constructor(props: PropsOf<FeaturesPageFeatureSection>) {
        super(props);
        this.featureGridLayout = props.featureGridLayout;
        this.features = props.features;
        this.illustration = props.illustration;
    }

    static override fromSanity(data: SanityFeatureSection, db: SanityDataset) {
        const featureCells = [];
        for (let i = 0; i < data.features.length; i += data.columnCount) {
            const chunk = data.features.slice(i, i + data.columnCount).map(x => FeatureGridCell.fromSanity(x, db));
            featureCells.push(chunk);
        }
        return new FeaturesPageFeatureSection(Object.assign(TechnicolorBlock.fromSanity(data, db), {
            featureGridLayout: data.featureGridLayout,
            features: featureCells,
            illustration: data.illustration ? illustrationFromSanity(db.resolveRef(data.illustration), db) : undefined,
        }));
    }
}

export const featuresPageSchemaName = "featuresPage";

const introSectionSchemaName = `${featuresPageSchemaName}_introSection`;

const introSectionSchema = defineType({
    name: introSectionSchemaName,
    title: "Intro Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        optionalActionsField,
        Object.assign({}, organisationLogosField, { name: "userLogos", title: "User Logos" }) as any,
    ],
});

const featureGridCellSchemaName = `${featuresPageSchemaName}_featureGridCell`;

const featureGridCellSchema = defineType({
    name: featureGridCellSchemaName,
    title: "Feature",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        illustrationFieldOptional, // TODO: hide this field when block type is 'text only'
    ],
});

const featureSectionSchemaName = `${featuresPageSchemaName}_featureSection`;

const featureSectionSchema = defineType({
    name: featureSectionSchemaName,
    title: "Feature Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        sectionIconField,
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
            of: [{type: featureGridCellSchemaName}],
            validation: (rule: ArrayRule<any>) => rule.required().min(2),
        }),
        illustrationFieldOptional,
        isVisibleField,
    ],
});

const featuresPageSchema = defineType({
    name: featuresPageSchemaName,
    title: "Features Page",
    type: "document",
    fields: [
        pageTitleField,
        defineField({
            name: introSection,
            title: "Intro Section",
            type: introSectionSchemaName,
            options: collapsibleOptions,
        }),
        defineField({
            name: featureSections,
            title: "Feature Sections",
            type: "array",
            of: [{type: featureSectionSchemaName}],
        }),
        defineField({
            name: finalSection,
            title: "Final Section",
            type: conclusionSectionSchemaName,
            options: collapsibleOptions,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Features Page" }), },
});

export const featuresPageSchemas = [featureSectionSchema, featureGridCellSchema, featuresPageSchema, introSectionSchema];

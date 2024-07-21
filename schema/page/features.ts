import { defineField, defineType } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { bodyFieldRichText, collapsible, optionalActionsField, titleFieldWithHighlights } from "../common-fields";
import { FeatureGridSection, featureGridSectionSchemaName, SanityFeatureGridSection } from "../component/feature-grid";
import { SanityDataset } from "../sanity-core";
import { SanityTitleBodyActions, TitleBodyActions } from "../text";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const introSection = "introSection";
const featureSections = "featureSections";
const finalSection = "finalSection";

export interface SanityFeaturesPage extends SanityPage {
    [introSection]: SanityTitleBodyActions;
    [featureSections]: SanityFeatureGridSection[];
    [finalSection]: SanityConclusionSection;
}

export class FeaturesPage extends Page {
    readonly [introSection]: IntroSection;
    readonly [featureSections]: FeatureGridSection[];
    readonly [finalSection]: ConclusionSection;

    constructor(data: SanityFeaturesPage, db: SanityDataset) {
        super(data, db);
        this.introSection = IntroSection.fromSanityIntroSection(data.introSection, db);
        this.featureSections = data.featureSections.map((x) => FeatureGridSection.fromSanity(x, db));
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

class IntroSection extends TitleBodyActions {
    constructor(props: PropsOf<IntroSection>) {
        super(props);
    }

    static fromSanityIntroSection(data: SanityTitleBodyActions, db: SanityDataset) {
        return TitleBodyActions.fromSanity(data, db);
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
    ],
});

const featuresPageSchema = defineType({
    name: featuresPageSchemaName,
    title: "Features Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: introSection,
            title: "Intro Section",
            type: introSectionSchemaName,
            options: collapsible,
        }),
        defineField({
            name: featureSections,
            title: "Feature Sections",
            type: "array",
            of: [{ type: featureGridSectionSchemaName }],
        }),
        defineField({
            name: finalSection,
            title: "Final Section",
            type: conclusionSectionSchemaName,
            options: collapsible,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Features Page" }) },
});

export const featuresPageSchemas = [featuresPageSchema, introSectionSchema];

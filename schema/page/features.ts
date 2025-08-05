import { defineField, defineType } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { collapsibleOptions } from "../common-fields";
import { FeatureGridSection, featureGridSectionSchemaName, SanityFeatureGridSection } from "../component/feature-grid";
import { sectionCoreSchemaName, SanitySectionCore, SectionCore } from "../component/section";
import { SanityDataset } from "../sanity-core";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const introSection = "introSection";
const featureSections = "featureSections";
const finalSection = "finalSection";

export interface SanityFeaturesPage extends SanityPage {
    [introSection]: SanitySectionCore;
    [featureSections]: SanityFeatureGridSection[];
    [finalSection]: SanityConclusionSection;
}

export class FeaturesPage extends Page {
    readonly [introSection]: SectionCore;
    readonly [featureSections]: FeatureGridSection[];
    readonly [finalSection]: ConclusionSection;

    constructor(data: SanityFeaturesPage, db: SanityDataset) {
        super(data, db);
        this.introSection = SectionCore.fromSanity(data.introSection, db);
        this.featureSections = data.featureSections.map((x) => FeatureGridSection.fromSanity(x, db));
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

export const featuresPageSchemaName = "featuresPage";

const featuresPageSchema = defineType({
    name: featuresPageSchemaName,
    title: "Features Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: introSection,
            title: "Intro Section",
            type: sectionCoreSchemaName,
            options: collapsibleOptions,
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
            options: collapsibleOptions,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Features Page" }) },
});

export const featuresPageSchemas = [featuresPageSchema];

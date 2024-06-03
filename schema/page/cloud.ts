import { defineField, defineType } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { collapsible, isVisibleField, keyPointsField, optionalActionsField, titleBodyIconFields } from "../common-fields";
import { SanityCoreSection, SectionBase, sectionBaseSchemaName } from "../component/section";
import { SanityTierSummaryTable } from "../component/tier-summary-table";
import { KeyPoint, SanityKeyPoint } from "../key-point";
import { SanityDataset } from "../sanity-core";
import { SanityTitleBodyActions, TitleBodyActions, titleBodyActionsSectionSchemaName } from "../text";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityCloudPage extends SanityPage {
    managedServiceSection: SanityManagedServiceSection;
    selfHostedSection: SanityCoreSection;
    // [finalSection]: SanityConclusionSection;
}

export interface SanityManagedServiceSection extends SanityCoreSection {
    tierSummaryTable: SanityTierSummaryTable;
}

export class CloudPage extends Page {
    readonly managedServiceSection: ManagedServiceSection;
    readonly selfHostedSection: SectionBase;
    // readonly [finalSection]: ConclusionSection;

    constructor(data: SanityCloudPage, db: SanityDataset) {
        super(data, db);
        this.introSection = TitleBodyActions.fromSanity(data.introSection, db);
        this.dbFusionSection = FeatureFusionSection.fromSanity(data.dbFusionSection, db);
        this.coreSections = data.coreSections.map((x) => SectionBase.fromSanity(x, db));
        // this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

export class FeatureFusionSection extends SectionBase {
    readonly items: KeyPoint[];

    constructor(props: PropsOf<FeatureFusionSection>) {
        super(props);
        this.items = props.items;
    }

    static override fromSanity(data: SanityFeatureFusionSection, db: SanityDataset) {
        return Object.assign(SectionBase.fromSanity(data, db), {
            items: data.keyPoints.map(x => new KeyPoint(x)),
        });
    }
}

export const whyPageSchemaName = "whyPage";
export const featureFusionSectionSchemaName = "featureFusionSection";

const featureFusionSectionSchema = defineType({
    name: featureFusionSectionSchemaName,
    title: "Feature Fusion Section",
    type: "object",
    fields: [
        ...titleBodyIconFields,
        optionalActionsField,
        keyPointsField(3),
        isVisibleField,
    ],
});

const whyPageSchema = defineType({
    name: whyPageSchemaName,
    title: "Why Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: introSection,
            title: "Intro Section",
            type: titleBodyActionsSectionSchemaName,
            options: collapsible,
        }),
        defineField({
            name: dbFusionSection,
            title: "DB Fusion Section",
            type: featureFusionSectionSchemaName,
            options: collapsible,
        }),
        defineField({
            name: coreSections,
            title: "Core Sections",
            type: "array",
            of: [{ type: sectionBaseSchemaName }],
        }),
        // defineField({
        //     name: finalSection,
        //     title: "Final Section",
        //     type: conclusionSectionSchemaName,
        //     options: collapsible,
        // }),
    ],
    preview: { prepare: (_selection) => ({ title: "Why Page" }) },
});

export const whyPageSchemas = [whyPageSchema, featureFusionSectionSchema];

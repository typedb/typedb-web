import { defineField, defineType } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { collapsibleOptions,  requiredRule } from "../common-fields";
import { resourceSectionSchemaName } from "../component/page-section";
import { SanityResourceSection } from "../resource/sanity";
import { ResourceSection } from "../resource/section";
import { SanityDataset } from "../sanity-core";
import { SanityTitleBodyActions, TitleBodyActions, titleBodyActionsSectionSchemaName } from "../text";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const introSection = "introSection";
const resourceSections = "resourceSections";
const finalSection = "finalSection";

export interface SanityLearningCenter extends SanityPage {
    [introSection]: SanityTitleBodyActions;
    [resourceSections]: SanityResourceSection[];
    [finalSection]: SanityConclusionSection;
}

export class LearningCenter extends Page {
    readonly [introSection]: TitleBodyActions;
    readonly [resourceSections]: ResourceSection[];
    readonly [finalSection]: ConclusionSection;

    constructor(data: SanityLearningCenter, db: SanityDataset) {
        super(data, db);
        this.introSection = TitleBodyActions.fromSanityTitleBodyActions(data.introSection, db);
        this.resourceSections = data.resourceSections.map((x) => ResourceSection.fromSanity(x, db));
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

export const learningCenterSchemaName = "learningCenter";

export const learningCenterSchema = defineType({
    name: learningCenterSchemaName,
    title: "Learning Center",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: introSection,
            title: "Intro Section",
            type: titleBodyActionsSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: resourceSections,
            title: "Resource Sections",
            type: "array",
            of: [{ type: resourceSectionSchemaName }],
            validation: requiredRule,
        }),
        defineField({
            name: finalSection,
            title: "Final Section",
            type: conclusionSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Learning Center" }) },
});

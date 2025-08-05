import { defineField, defineType } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { collapsibleOptions,  requiredRule } from "../common-fields";
import { resourceSectionSchemaName, SanitySectionCore, SectionCore, sectionCoreSchemaName } from "../component/section";
import { SanityResourceSection } from "../resource/sanity";
import { ResourceSection } from "../resource/section";
import { SanityDataset } from "../sanity-core";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const introSection = "introSection";
const resourceSections = "resourceSections";
const finalSection = "finalSection";

export interface SanityResourceHub extends SanityPage {
    [introSection]: SanitySectionCore;
    [resourceSections]: SanityResourceSection[];
    [finalSection]: SanityConclusionSection;
}

export class ResourceHub extends Page {
    readonly [introSection]: SectionCore;
    readonly [resourceSections]: ResourceSection[];
    readonly [finalSection]: ConclusionSection;

    constructor(data: SanityResourceHub, db: SanityDataset) {
        super(data, db);
        this.introSection = SectionCore.fromSanity(data.introSection, db);
        this.resourceSections = data.resourceSections.map((x) => ResourceSection.fromSanity(x, db));
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

const resourceHubSchemaBase = defineType({
    name: "ABSTRACT",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: introSection,
            title: "Intro Section",
            type: sectionCoreSchemaName,
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
});

export const learningCenterSchemaName = "learningCenter";

const learningCenterSchema = defineType({
    ...resourceHubSchemaBase,
    name: learningCenterSchemaName,
    title: "Learning Center",
    preview: { prepare: (_selection) => ({ title: "Learning Center" }) },
});

export const fundamentalsPageSchemaName = "fundamentalsPage";

const fundamentalsPageSchema = defineType({
    ...resourceHubSchemaBase,
    name: fundamentalsPageSchemaName,
    title: "Fundamentals Page",
    preview: { prepare: (_selection) => ({ title: "Fundamentals Page" }) },
});

export const learnPageSchemas = [learningCenterSchema, fundamentalsPageSchema];

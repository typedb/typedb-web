import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType, Slug } from "@sanity/types";
import { QueryLanguageComparisonSection, queryLanguageComparisonSectionSchemaName, SanityQueryLanguageComparisonSection } from "../code";
import { coreSectionSchemaName, SanityCoreSection, SanityTitleBodyIllustrationSection, TitleBodyIllustrationSection, titleBodyIllustrationSectionSchemaName } from "../component/section";
import { SectionBase } from "../component/section";
import {
    collapsibleOptions, routeField, titleField,
} from "../common-fields";
import { KeyPointsSection, keyPointsSectionSchemaName, SanityKeyPointsSection } from "../key-point";
import { SanityDataset } from "../sanity-core";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    benefits1: { id: "benefitsSection1", title: "Benefits 1" },
    benefits2: { id: "benefitsSection2", title: "Benefits 2" },
    benefits3: { id: "benefitsSection3", title: "Benefits 3" },
    queryLanguageComparison: { id: "queryLanguageComparisonSection", title: "Query Language Comparison" },
    benefits4: { id: "benefitsSection4", title: "Benefits 4" },
    studio: { id: "studioSection", title: "Studio" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = (typeof sections)[SectionKey]["id"];

export const useCasePageTemplateSchemaName = "useCasePageTemplate";
export const useCasePageSchemaName = "useCasePage";

export interface SanityUseCasePageTemplate extends SanityPage {
    [sections.intro.id]: SanityCoreSection;
    [sections.benefits1.id]: SanityTitleBodyIllustrationSection;
    [sections.benefits2.id]: SanityTitleBodyIllustrationSection;
    [sections.benefits3.id]: SanityKeyPointsSection;
    [sections.queryLanguageComparison.id]: SanityQueryLanguageComparisonSection;
    [sections.benefits4.id]: SanityTitleBodyIllustrationSection;
    [sections.studio.id]: SanityTitleBodyIllustrationSection;
}

export interface SanityUseCasePageInstance extends SanityUseCasePageTemplate {
    title: string;
    route: Slug;
}

export class UseCasePageTemplate extends Page {
    readonly [sections.intro.id]?: SectionBase;
    readonly [sections.benefits1.id]?: TitleBodyIllustrationSection;
    readonly [sections.benefits2.id]?: TitleBodyIllustrationSection;
    readonly [sections.benefits3.id]?: KeyPointsSection;
    readonly [sections.queryLanguageComparison.id]?: QueryLanguageComparisonSection;
    readonly [sections.benefits4.id]?: TitleBodyIllustrationSection;
    readonly [sections.studio.id]?: TitleBodyIllustrationSection;

    constructor(data: SanityUseCasePageTemplate, db: SanityDataset) {
        super(data, db);
        this[sections.intro.id] = data[sections.intro.id].isVisible
            ? SectionBase.fromSanity(data[sections.intro.id], db)
            : undefined;
        this[sections.benefits1.id] = data[sections.benefits1.id].isVisible
            ? TitleBodyIllustrationSection.fromSanity(data[sections.benefits1.id], db)
            : undefined;
        this[sections.benefits2.id] = data[sections.benefits2.id].isVisible
            ? TitleBodyIllustrationSection.fromSanity(data[sections.benefits2.id], db)
            : undefined;
        this[sections.benefits3.id] = data[sections.benefits3.id].isVisible
            ? KeyPointsSection.fromSanity(data[sections.benefits3.id], db)
            : undefined;
        this[sections.queryLanguageComparison.id] = data[sections.queryLanguageComparison.id].isVisible
            ? QueryLanguageComparisonSection.fromSanity(data[sections.queryLanguageComparison.id], db)
            : undefined;
        this[sections.benefits4.id] = data[sections.benefits4.id].isVisible
            ? TitleBodyIllustrationSection.fromSanity(data[sections.benefits4.id], db)
            : undefined;
        this[sections.studio.id] = data[sections.studio.id].isVisible
            ? TitleBodyIllustrationSection.fromSanity(data[sections.studio.id], db)
            : undefined;
    }
}

export class UseCasePageInstance extends UseCasePageTemplate {
    readonly title: string;
    readonly route: string;

    constructor(instance: SanityUseCasePageInstance, db: SanityDataset) {
        const template = db.getDocumentByID<SanityUseCasePageTemplate>(useCasePageTemplateSchemaName);
        const data: SanityUseCasePageInstance = Object.assign({}, template, instance);
        super(instance, db);
        this.title = data.title;
        this.route = data.route.current;
    }
}

const introSectionField = defineField({
    name: sections.intro.id,
    title: `${sections.intro.title} Section`,
    type: coreSectionSchemaName,
    options: collapsibleOptions,
});

const benefitsSection1Field = defineField({
    name: sections.benefits1.id,
    title: `${sections.benefits1.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const benefitsSection2Field = defineField({
    name: sections.benefits2.id,
    title: `${sections.benefits2.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const benefitsSection3Field = defineField({
    name: sections.benefits3.id,
    title: `${sections.benefits3.title} Section`,
    type: keyPointsSectionSchemaName,
    options: collapsibleOptions,
});

const queryLanguageComparisonSectionField = defineField({
    name: sections.queryLanguageComparison.id,
    title: `${sections.queryLanguageComparison.title} Section`,
    type: queryLanguageComparisonSectionSchemaName,
    options: collapsibleOptions,
});

const benefitsSection4Field = defineField({
    name: sections.benefits4.id,
    title: `${sections.benefits4.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const studioSectionField = defineField({
    name: sections.studio.id,
    title: `${sections.studio.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const sectionFields = [
    introSectionField,
    benefitsSection1Field,
    benefitsSection2Field,
    benefitsSection3Field,
    queryLanguageComparisonSectionField,
    benefitsSection4Field,
    studioSectionField,
];

const useCasePageTemplateSchema = defineType({
    name: useCasePageTemplateSchemaName,
    title: "Use Case Page Template",
    type: "document",
    icon: DocumentIcon,
    fields: [
        metaTagsField,
        ...sectionFields,
    ],
    preview: {
        select: { },
        prepare: () => ({ title: `Use Case Page Template` }),
    },
});

const useCasePageSchema = defineType({
    name: useCasePageSchemaName,
    title: "Use Case Page",
    type: "document",
    icon: DocumentIcon,
    fields: [
        metaTagsField,
        titleField,
        Object.assign({}, routeField, { description: "URL fragment for this use case page (e.g. cybersecurity). Do not include 'use-case', this is automatically prepended", }),
        ...sectionFields,
    ],
    preview: {
        select: { title: "title" },
        prepare: (selection) => ({ title: selection.title }),
    },
});

export const useCasePageSchemas = [useCasePageTemplateSchema,useCasePageSchema];

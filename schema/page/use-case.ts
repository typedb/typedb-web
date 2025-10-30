import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType, Slug } from "@sanity/types";
import { QueryLanguageComparisonSection, queryLanguageComparisonSectionSchemaName, SanityQueryLanguageComparisonSection } from "../code";
import { sectionCoreSchemaName, SanitySectionCore, SanityIllustrationSection, IllustrationSection, titleBodyIllustrationSectionSchemaName, SanityHotTopicsSection, hotTopicsSectionSchemaName } from "../component/section";
import { SectionCore } from "../component/section";
import {
    collapsibleOptions, routeField, titleField,
} from "../common-fields";
import { KeyPointsSection, keyPointsSectionSchemaName, SanityKeyPointsSection } from "../key-point";
import { ResourceLink } from "../resource/base";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    benefits1: { id: "benefitsSection1", title: "Benefits 1" },
    hotTopics: { id: "hotTopicsSection", title: "Hot Topics" },
    benefits2: { id: "benefitsSection2", title: "Benefits 2" },
    benefits3: { id: "benefitsSection3", title: "Benefits 3" },
    queryLanguageComparison: { id: "queryLanguageComparisonSection", title: "Query Language Comparison" },
    benefits4: { id: "benefitsSection4", title: "Benefits 4" },
    faqs: { id: "faqsSection", title: "FAQs" },
} as const;

type SectionKey = keyof typeof sections;
type SectionID = (typeof sections)[SectionKey]["id"];

export const useCasePageTemplateSchemaName = "useCasePageTemplate";
export const useCasePageSchemaName = "useCasePage";

export interface SanityUseCasePageTemplate extends SanityPage {
    [sections.intro.id]: SanityIllustrationSection;
    [sections.benefits1.id]: SanityKeyPointsSection;
    [sections.hotTopics.id]: SanityHotTopicsSection;
    [sections.benefits2.id]: SanityIllustrationSection;
    [sections.benefits3.id]: SanityIllustrationSection;
    [sections.queryLanguageComparison.id]: SanityQueryLanguageComparisonSection;
    [sections.benefits4.id]: SanityIllustrationSection;
    [sections.faqs.id]: SanitySectionCore;
}

export interface SanityUseCasePageInstance extends SanityUseCasePageTemplate {
    title: string;
    route: Slug;
}

export class UseCasePageTemplate extends Page {
    readonly [sections.intro.id]?: IllustrationSection;
    readonly [sections.benefits1.id]?: KeyPointsSection;
    readonly [sections.hotTopics.id]?: HotTopicsSection;
    readonly [sections.benefits2.id]?: IllustrationSection;
    readonly [sections.benefits3.id]?: IllustrationSection;
    readonly [sections.queryLanguageComparison.id]?: QueryLanguageComparisonSection;
    readonly [sections.benefits4.id]?: IllustrationSection;
    readonly [sections.faqs.id]?: SectionCore;

    constructor(data: SanityUseCasePageTemplate, db: SanityDataset) {
        super(data, db);
        this[sections.intro.id] = data[sections.intro.id].isVisible
            ? IllustrationSection.fromSanity(data[sections.intro.id], db)
            : undefined;
        this[sections.benefits1.id] = data[sections.benefits1.id].isVisible
            ? KeyPointsSection.fromSanity(data[sections.benefits1.id], db)
            : undefined;
        this[sections.hotTopics.id] = data[sections.hotTopics.id].isVisible
            ? HotTopicsSection.fromSanity(data[sections.hotTopics.id], db)
            : undefined;
        this[sections.benefits2.id] = data[sections.benefits2.id].isVisible
            ? IllustrationSection.fromSanity(data[sections.benefits2.id], db)
            : undefined;
        this[sections.benefits3.id] = data[sections.benefits3.id].isVisible
            ? IllustrationSection.fromSanity(data[sections.benefits3.id], db)
            : undefined;
        this[sections.queryLanguageComparison.id] = data[sections.queryLanguageComparison.id].isVisible
            ? QueryLanguageComparisonSection.fromSanity(data[sections.queryLanguageComparison.id], db)
            : undefined;
        this[sections.benefits4.id] = data[sections.benefits4.id].isVisible
            ? IllustrationSection.fromSanity(data[sections.benefits4.id], db)
            : undefined;
        this[sections.faqs.id] = data[sections.faqs.id].isVisible
            ? SectionCore.fromSanity(data[sections.faqs.id], db)
            : undefined;
    }
}

export class UseCasePageInstance extends UseCasePageTemplate {
    readonly title: string;
    readonly route: string;

    constructor(instance: SanityUseCasePageInstance, db: SanityDataset) {
        const template = db.getDocumentByID<SanityUseCasePageTemplate>(useCasePageTemplateSchemaName);
        if (template == null) throw new Error(`Document not found: ${useCasePageTemplateSchemaName}`);
        instance.introSection = Object.assign(template.introSection, instance.introSection);
        instance.benefitsSection1 = Object.assign(template.benefitsSection1, instance.benefitsSection1);
        instance.benefitsSection2 = Object.assign(template.benefitsSection2, instance.benefitsSection2);
        instance.benefitsSection3 = Object.assign(template.benefitsSection3, instance.benefitsSection3);
        instance.queryLanguageComparisonSection = Object.assign(template.queryLanguageComparisonSection, instance.queryLanguageComparisonSection);
        instance.benefitsSection4 = Object.assign(template.benefitsSection4, instance.benefitsSection4);
        instance.faqsSection = Object.assign(template.faqsSection, instance.faqsSection);
        super(instance, db);
        this.title = instance.title;
        this.route = instance.route.current;
    }
}

// TODO: copy pasta-ed from home.ts on 30/10/25
export class HotTopicsSection extends SectionCore {
    readonly hotTopics: ResourceLink[];

    constructor(props: PropsOf<HotTopicsSection>) {
        super(props);
        this.hotTopics = props.hotTopics;
    }

    static override fromSanity(data: SanityHotTopicsSection, db: SanityDataset) {
        return new HotTopicsSection(Object.assign(SectionCore.fromSanity(data, db), {
            hotTopics: data.hotTopics?.map(x => ResourceLink.fromSanity(db.resolveRef(x), db, false)) || [],
        }));
    }
}

const introSectionField = defineField({
    name: sections.intro.id,
    title: `${sections.intro.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const benefitsSection1Field = defineField({
    name: sections.benefits1.id,
    title: `${sections.benefits1.title} Section`,
    type: keyPointsSectionSchemaName,
    options: collapsibleOptions,
});

const hotTopicsSectionField = defineField({
    name: sections.hotTopics.id,
    title: `${sections.hotTopics.title} Section`,
    type: hotTopicsSectionSchemaName,
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
    type: titleBodyIllustrationSectionSchemaName,
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

const faqsSectionField = defineField({
    name: sections.faqs.id,
    title: `${sections.faqs.title} Section`,
    type: titleBodyIllustrationSectionSchemaName,
    options: collapsibleOptions,
});

const sectionFields = [
    introSectionField,
    benefitsSection1Field,
    hotTopicsSectionField,
    benefitsSection2Field,
    benefitsSection3Field,
    queryLanguageComparisonSectionField,
    benefitsSection4Field,
    faqsSectionField,
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
        Object.assign({}, routeField, { description: "URL fragment for this use case page (e.g. agentics). Do not include 'use-case', this is automatically prepended", }),
        ...sectionFields,
    ],
    preview: {
        select: { title: "title" },
        prepare: (selection) => ({ title: selection.title }),
    },
});

export const useCasePageSchemas = [useCasePageTemplateSchema, useCasePageSchema];

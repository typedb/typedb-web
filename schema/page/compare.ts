import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType, Slug } from "@sanity/types";
import { collapsibleOptions, routeField, titleField } from "../common-fields";
import { ClosingPanelSection, closingPanelSectionSchemaName, SanityClosingPanelSection } from "../component/closing-panel-section";
import {
    CompareChoiceSection, compareChoiceSectionSchemaName, CompareFeatureSection, compareFeatureSectionSchemaName,
    SanityCompareChoiceSection, SanityCompareFeatureSection,
} from "../component/compare";
import { FeatureTableSection, featureTableSectionSchemaName, SanityFeatureTableSection } from "../component/feature-table";
import {
    IllustrationSection, illustrationSectionSchemaName, LinkPanelsSection, linkPanelsSectionSchemaName, SanityIllustrationSection,
    SanityLinkPanelsSection,
} from "../component/section";
import { SanityDataset } from "../sanity-core";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    overview: { id: "overviewSection", title: "Overview" },
    comparisonTable: { id: "comparisonTableSection", title: "Comparison Table" },
    choice: { id: "choiceSection", title: "Making the Choice" },
    conclusion: { id: "conclusionSection", title: "Conclusion" },
} as const;

export const comparePageTemplateSchemaName = "comparePageTemplate";
export const comparePageSchemaName = "comparePage";

type SanityCompareSection =
    | ({ _type: typeof compareFeatureSectionSchemaName } & SanityCompareFeatureSection)
    | ({ _type: typeof linkPanelsSectionSchemaName } & SanityLinkPanelsSection);

export type CompareSection = CompareFeatureSection | LinkPanelsSection;

export interface SanityComparePageTemplate extends SanityPage {
    [sections.intro.id]?: SanityIllustrationSection;
    [sections.overview.id]?: SanityLinkPanelsSection;
    [sections.comparisonTable.id]?: SanityFeatureTableSection;
    featureSections?: SanityCompareSection[];
    [sections.choice.id]?: SanityCompareChoiceSection;
    [sections.conclusion.id]?: SanityClosingPanelSection;
}

export interface SanityComparePageInstance extends SanityComparePageTemplate {
    title: string;
    route: Slug;
}

export class ComparePageTemplate extends Page {
    readonly [sections.intro.id]?: IllustrationSection;
    readonly [sections.overview.id]?: LinkPanelsSection;
    readonly [sections.comparisonTable.id]?: FeatureTableSection;
    readonly featureSections: CompareSection[];
    readonly [sections.choice.id]?: CompareChoiceSection;
    readonly [sections.conclusion.id]?: ClosingPanelSection;

    constructor(data: SanityComparePageTemplate, db: SanityDataset) {
        super(data, db);
        this[sections.intro.id] = data[sections.intro.id]?.isVisible
            ? IllustrationSection.fromSanity(data[sections.intro.id]!, db)
            : undefined;
        this[sections.overview.id] = data[sections.overview.id]?.isVisible
            ? LinkPanelsSection.fromSanity(data[sections.overview.id]!, db)
            : undefined;
        this[sections.comparisonTable.id] = data[sections.comparisonTable.id]?.isVisible
            ? FeatureTableSection.fromSanity(data[sections.comparisonTable.id]!, db)
            : undefined;
        this.featureSections = (data.featureSections || []).filter((x) => x.isVisible)
            .map((x) => x._type === linkPanelsSectionSchemaName
                ? LinkPanelsSection.fromSanity(x, db)
                : CompareFeatureSection.fromSanity(x, db));
        this[sections.choice.id] = data[sections.choice.id]?.isVisible
            ? CompareChoiceSection.fromSanity(data[sections.choice.id]!, db)
            : undefined;
        this[sections.conclusion.id] = data[sections.conclusion.id]?.isVisible
            ? ClosingPanelSection.fromSanity(data[sections.conclusion.id]!, db)
            : undefined;
    }
}

export class ComparePageInstance extends ComparePageTemplate {
    readonly title: string;
    readonly route: string;

    constructor(instance: SanityComparePageInstance, db: SanityDataset) {
        const template = db.getDocumentByID<SanityComparePageTemplate>(comparePageTemplateSchemaName);
        if (template == null) throw new Error(`Document not found: ${comparePageTemplateSchemaName}`);
        // Merge into a copy - `instance` lives inside the shared Sanity dataset, and mutating it
        // would leak the merged sections into this page's serialized TransferState.
        // Feature sections are specific to each comparison, so they are never taken from the template.
        const merged: SanityComparePageInstance = Object.assign({}, instance, {
            introSection: Object.assign({}, template.introSection, instance.introSection),
            overviewSection: Object.assign({}, template.overviewSection, instance.overviewSection),
            comparisonTableSection: Object.assign({}, template.comparisonTableSection, instance.comparisonTableSection),
            choiceSection: Object.assign({}, template.choiceSection, instance.choiceSection),
            conclusionSection: Object.assign({}, template.conclusionSection, instance.conclusionSection),
            metaTags: Object.assign({}, template.metaTags, instance.metaTags),
        });
        super(merged, db);
        this.title = merged.title;
        this.route = merged.route.current;
    }
}

const introSectionField = defineField({
    name: sections.intro.id,
    title: `${sections.intro.title} Section`,
    type: illustrationSectionSchemaName,
    description: "Set the eyebrow to the breadcrumb, e.g. 'Compare / Neo4j'. Use the 'Lead' style for the opening paragraph",
    options: collapsibleOptions,
});

const overviewSectionField = defineField({
    name: sections.overview.id,
    title: `${sections.overview.title} Section`,
    type: linkPanelsSectionSchemaName,
    description: "The main differences at a glance, as cards linking to the feature sections below",
    options: collapsibleOptions,
});

const comparisonTableSectionField = defineField({
    name: sections.comparisonTable.id,
    title: `${sections.comparisonTable.title} Section`,
    type: featureTableSectionSchemaName,
    description: "The full comparison table, shown after the choice section. The column for the product named TypeDB is highlighted",
    options: collapsibleOptions,
});

const featureSectionsField = defineField({
    name: "featureSections",
    title: "Feature Sections",
    type: "array",
    description: "Each one compares a single feature. Link panels suit points that aren't a side-by-side comparison",
    of: [defineArrayMember({ type: compareFeatureSectionSchemaName }), defineArrayMember({ type: linkPanelsSectionSchemaName })],
});

const choiceSectionField = defineField({
    name: sections.choice.id,
    title: `${sections.choice.title} Section`,
    type: compareChoiceSectionSchemaName,
    options: collapsibleOptions,
});

const conclusionSectionField = defineField({
    name: sections.conclusion.id,
    title: `${sections.conclusion.title} Section`,
    type: closingPanelSectionSchemaName,
    options: collapsibleOptions,
});

const templateSectionFields = [introSectionField, overviewSectionField, comparisonTableSectionField, choiceSectionField, conclusionSectionField];

const comparePageTemplateSchema = defineType({
    name: comparePageTemplateSchemaName,
    title: "Compare Page Template",
    type: "document",
    icon: DocumentIcon,
    description: "Defaults for every compare page. Fields left empty on a compare page fall back to these",
    fields: [
        metaTagsField,
        ...templateSectionFields,
    ],
    preview: {
        select: {},
        prepare: () => ({ title: "Compare Page Template" }),
    },
});

const comparePageSchema = defineType({
    name: comparePageSchemaName,
    title: "Compare Page",
    type: "document",
    icon: DocumentIcon,
    fields: [
        metaTagsField,
        Object.assign({}, titleField, { description: "The product TypeDB is compared with, e.g. 'Neo4j'" }),
        Object.assign({}, routeField, {
            description: "URL fragment for this compare page (e.g. typedb-vs-neo4j). Do not include 'compare', this is automatically prepended",
        }),
        introSectionField,
        overviewSectionField,
        featureSectionsField,
        choiceSectionField,
        comparisonTableSectionField,
        conclusionSectionField,
    ],
    preview: {
        select: { title: "title", route: "route.current" },
        prepare: (selection) => ({ title: `TypeDB vs ${selection.title}`, subtitle: selection.route && `/compare/${selection.route}` }),
    },
});

export const comparePageSchemas = [comparePageTemplateSchema, comparePageSchema];

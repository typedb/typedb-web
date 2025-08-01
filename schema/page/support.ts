import { defineField, defineType } from "@sanity/types";
import {
    collapsibleOptions, isVisibleField, actionsFieldOptional, requiredRule, titleBodyActionsFields,
} from "../common-fields";
import { featureTableSchemaName, FeatureTableSection, SanityFeatureTableSection } from "../component/feature-table";
import { linkPanelSchemaName } from "../component/link-panel";
import { LinkPanelsSection, SanityCoreSection, SanityLinkPanelsSection, SectionBase } from "../component/section";
import { SanityDataset } from "../sanity-core";
import { SanityTestimonialsSection, TestimonialsSection, testimonialsSectionField } from "../testimonial";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    featureTable: { id: "featureTableSection", title: "Feature Table" },
    testimonials: { id: "testimonialsSection", title: "Testimonials" },
    contact: { id: "contactSection", title: "Contact" },
} as const;

type SectionKey = keyof typeof sections;

export interface SanitySupportPage extends SanityPage {
    [sections.intro.id]: SanityLinkPanelsSection;
    [sections.featureTable.id]: SanityFeatureTableSection;
    [sections.testimonials.id]: SanityTestimonialsSection;
    [sections.contact.id]: SanityCoreSection;
}

export class SupportPage extends Page {
    readonly [sections.intro.id]?: LinkPanelsSection;
    readonly [sections.featureTable.id]?: FeatureTableSection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly [sections.contact.id]?: SectionBase;

    constructor(data: SanitySupportPage, db: SanityDataset) {
        super(data, db);
        this[sections.intro.id] = data.introSection.isVisible
            ? LinkPanelsSection.fromSanity(data.introSection, db)
            : undefined;
        this[sections.featureTable.id] = FeatureTableSection.fromSanity(data.featureTableSection, db);
        this[sections.testimonials.id] = data.testimonialsSection.isVisible
            ? TestimonialsSection.fromSanity(data.testimonialsSection, db)
            : undefined;
        this[sections.contact.id] = data.contactSection.isVisible
            ? SectionBase.fromSanity(data.contactSection, db)
            : undefined;
    }
}

export const supportPageSchemaName = "supportPage";

const sectionSchemaName = (key: SectionKey) => `${supportPageSchemaName}_${sections[key].id}`;

const sectionSchema = (key: SectionKey, fields: any[]) =>
    defineType({
        name: sectionSchemaName(key),
        title: `${sections[key].title} Section`,
        type: "object",
        fields: fields,
    });

const sectionSchemas = [
    sectionSchema("intro", [
        ...titleBodyActionsFields,
        defineField({
            name: "panels",
            title: "Panels",
            type: "array",
            of: [{ type: linkPanelSchemaName }],
            validation: (rule) => rule.required().length(3),
        }),
        isVisibleField,
    ]),
    sectionSchema("featureTable", [
        ...titleBodyActionsFields,
        defineField({
            name: "featureTable",
            title: "Feature Table",
            type: featureTableSchemaName,
            validation: requiredRule,
        }),
    ]),
    sectionSchema("contact", [...titleBodyActionsFields, isVisibleField]),
];

const sectionFields = (Object.keys(sections) as SectionKey[])
    .filter((key) => !["testimonials"].includes(key))
    .map((key) => defineField({
        name: sections[key].id,
        title: `${sections[key].title} Section`,
        type: sectionSchemaName(key),
        options: collapsibleOptions,
    })
);

const supportPageSchema = defineType({
    name: supportPageSchemaName,
    title: "Support Page",
    type: "document",
    fields: [metaTagsField, ...sectionFields, testimonialsSectionField],
    preview: { prepare: (_selection) => ({ title: "Support Page" }) },
});

export const supportPageSchemas = [supportPageSchema, ...sectionSchemas];

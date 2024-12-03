import { defineField, defineType } from "@sanity/types";
import {
    collapsibleOptions, isVisibleField, actionsFieldOptional, titleBodyIconFields, requiredRule,
} from "../common-fields";
import { FeatureTable, SanityFeatureTable, featureTableSchemaName } from "../component/feature-table";
import { linkPanelWithIconSchemaName } from "../component/link-panel";
import { LinkPanelsSection, SanityCoreSection, SanityLinkPanelsSection } from "../component/page-section";
import { TechnicolorBlock } from "../component/technicolor-block";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SanityTestimonial, Testimonial, testimonialSchemaName } from "../testimonial";
import { PropsOf } from "../util";
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

interface SanityFeatureTableSection extends SanityCoreSection {
    featureTable: SanityFeatureTable;
}

interface SanityTestimonialsSection extends SanityCoreSection {
    testimonials: SanityReference<SanityTestimonial>[];
}

export class SupportPage extends Page {
    readonly [sections.intro.id]?: LinkPanelsSection;
    readonly [sections.featureTable.id]?: FeatureTableSection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly [sections.contact.id]?: TechnicolorBlock;

    constructor(data: SanitySupportPage, db: SanityDataset) {
        super(data, db);
        this[sections.intro.id] = data.introSection.isVisible
            ? LinkPanelsSection.fromSanity(data.introSection, db)
            : undefined;
        this[sections.featureTable.id] = data.featureTableSection.isVisible
            ? FeatureTableSection.fromSanity(data.featureTableSection, db)
            : undefined;
        this[sections.testimonials.id] = data.testimonialsSection.isVisible
            ? TestimonialsSection.fromSanity(data.testimonialsSection, db)
            : undefined;
        this[sections.contact.id] = data.contactSection.isVisible
            ? TechnicolorBlock.fromSanity(data.contactSection, db)
            : undefined;
    }
}

class FeatureTableSection extends TechnicolorBlock {
    readonly featureTable: FeatureTable;

    constructor(props: PropsOf<FeatureTableSection>) {
        super(props);
        this.featureTable = props.featureTable;
    }

    static override fromSanity(data: SanityFeatureTableSection, db: SanityDataset) {
        return new FeatureTableSection({
            ...super.fromSanity(data, db),
            featureTable: FeatureTable.fromSanity(data.featureTable, db),
        });
    }
}

class TestimonialsSection extends TechnicolorBlock {
    readonly testimonials: Testimonial[];

    constructor(props: PropsOf<TestimonialsSection>) {
        super(props);
        this.testimonials = props.testimonials;
    }

    static override fromSanity(data: SanityTestimonialsSection, db: SanityDataset) {
        return new TestimonialsSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                testimonials: data.testimonials.map((x) => new Testimonial(db.resolveRef(x), db)),
            })
        );
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
        ...titleBodyIconFields,
        actionsFieldOptional,
        defineField({
            name: "panels",
            title: "Panels",
            type: "array",
            of: [{ type: linkPanelWithIconSchemaName }],
            validation: (rule) => rule.required().length(3),
        }),
        isVisibleField,
    ]),
    sectionSchema("featureTable", [
        ...titleBodyIconFields,
        actionsFieldOptional,
        defineField({
            name: "featureTable",
            title: "Feature Table",
            type: featureTableSchemaName,
            validation: requiredRule,
        }),
        isVisibleField,
    ]),
    sectionSchema("testimonials", [
        ...titleBodyIconFields,
        actionsFieldOptional,
        defineField({
            name: "testimonials",
            title: "Testimonials",
            type: "array",
            of: [{ type: "reference", to: [{ type: testimonialSchemaName }] }],
        }),
        isVisibleField,
    ]),
    sectionSchema("contact", [...titleBodyIconFields, actionsFieldOptional, isVisibleField]),
];

const sectionFields = (Object.keys(sections) as SectionKey[]).map((key) =>
    defineField({
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
    fields: [metaTagsField, ...sectionFields],
    preview: { prepare: (_selection) => ({ title: "Support Page" }) },
});

export const supportPageSchemas = [supportPageSchema, ...sectionSchemas];

import { defineField, defineType } from "@sanity/types";
import { SanityOptionalActions } from "../button";
import {
    collapsibleOptions, isVisibleField, actionsFieldOptional, SanityVisibleToggle, titleBodyActionsFields,
} from "../common-fields";
import { SanitySectionBase, SectionBase } from "../component/section";
import { SanityDataset } from "../sanity-core";
import { SanityTestimonialsSection, testimonialSchemaName, TestimonialsSection } from "../testimonial";
import { SanityTitleBodyActions } from "../text";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";
import { SanityServicesKeyPoint, ServicesKeyPoint, servicesKeyPointSchemaName } from "../key-point";
import { metaTagsField } from "./meta-tags";

const sections = {
    intro: { id: "introSection", title: "Intro" },
    testimonials: { id: "testimonialsSection", title: "Testimonials" },
    contact: { id: "contactSection", title: "Contact" },
} as const;

type SectionKey = keyof typeof sections;

export interface SanityServicesPage extends SanityPage {
    [sections.intro.id]: SanityIntroSection;
    [sections.testimonials.id]: SanityTestimonialsSection;
    [sections.contact.id]: SanityCoreSection;
}

interface SanitySection extends SanityTitleBodyActions, SanityVisibleToggle {}

interface SanityCoreSection extends SanitySection, SanitySectionBase {}

interface SanityIntroSection extends SanityCoreSection, SanityOptionalActions {
    keyPoints: SanityServicesKeyPoint[];
}

export class ServicesPage extends Page {
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly [sections.contact.id]?: SectionBase;

    constructor(data: SanityServicesPage, db: SanityDataset) {
        super(data, db);
        this[sections.intro.id] = data.introSection.isVisible
            ? IntroSection.fromSanity(data.introSection, db)
            : undefined;
        this[sections.testimonials.id] = data.testimonialsSection.isVisible
            ? TestimonialsSection.fromSanity(data.testimonialsSection, db)
            : undefined;
        this[sections.contact.id] = data.contactSection.isVisible
            ? ContactSection.fromSanity(data.contactSection, db)
            : undefined;
    }
}

class IntroSection extends SectionBase {
    readonly keyPoints: ServicesKeyPoint[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.keyPoints = props.keyPoints;
    }

    static override fromSanity(data: SanityIntroSection, db: SanityDataset) {
        return new IntroSection({
            ...super.fromSanity(data, db),
            keyPoints: data.keyPoints.map((x) => ServicesKeyPoint.fromSanity(x, db)),
        });
    }
}

class ContactSection extends SectionBase {}

export const servicesPageSchemaName = "servicesPage";

const sectionSchemaName = (key: SectionKey) => `${servicesPageSchemaName}_${sections[key].id}`;

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
            name: "keyPoints",
            title: "Key Points",
            type: "array",
            of: [{ type: servicesKeyPointSchemaName }],
        }),
        isVisibleField,
    ]),
    sectionSchema("testimonials", [
        ...titleBodyActionsFields,
        defineField({
            name: "testimonials",
            title: "Testimonials",
            type: "array",
            of: [{ type: "reference", to: [{ type: testimonialSchemaName }] }],
        }),
        isVisibleField,
    ]),
    sectionSchema("contact", [...titleBodyActionsFields, isVisibleField]),
];

const sectionFields = (Object.keys(sections) as SectionKey[]).map((key) =>
    defineField({
        name: sections[key].id,
        title: `${sections[key].title} Section`,
        type: sectionSchemaName(key),
        options: collapsibleOptions,
    })
);

const servicesPageSchema = defineType({
    name: servicesPageSchemaName,
    title: "Services Page",
    type: "document",
    fields: [metaTagsField, ...sectionFields],
    preview: { prepare: (_selection) => ({ title: "Services Page" }) },
});

export const servicesPageSchemas = [servicesPageSchema, ...sectionSchemas];

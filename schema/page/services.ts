import { defineField, defineType } from "@sanity/types";
import { SanityOptionalActions } from "../button";
import {
    collapsible,
    isVisibleField,
    optionalActionsField,

    titleBodyIconFields,
    SanityVisibleToggle,
} from "../common-fields";
import { SanityCoreSection, SectionBase } from "../component/section";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SanityTestimonial, Testimonial, testimonialSchemaName } from "../testimonial";
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

interface SanityIntroSection extends SanityCoreSection {
    keyPoints: SanityServicesKeyPoint[];
}

interface SanityTestimonialsSection extends SanityCoreSection {
    testimonials: SanityReference<SanityTestimonial>[];
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
            keyPoints: data.keyPoints.map((x) => new ServicesKeyPoint(x, db)),
        });
    }
}

class TestimonialsSection extends SectionBase {
    readonly testimonials: Testimonial[];

    constructor(props: PropsOf<TestimonialsSection>) {
        super(props);
        this.testimonials = props.testimonials;
    }

    static override fromSanity(data: SanityTestimonialsSection, db: SanityDataset) {
        return new TestimonialsSection(
            Object.assign(SectionBase.fromSanity(data, db), {
                testimonials: data.testimonials.map((x) => new Testimonial(db.resolveRef(x), db)),
            })
        );
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
        ...titleBodyIconFields,
        optionalActionsField,
        defineField({
            name: "keyPoints",
            title: "Key Points",
            type: "array",
            of: [{ type: servicesKeyPointSchemaName }],
        }),
        isVisibleField,
    ]),
    sectionSchema("testimonials", [
        ...titleBodyIconFields,
        optionalActionsField,
        defineField({
            name: "testimonials",
            title: "Testimonials",
            type: "array",
            of: [{ type: "reference", to: [{ type: testimonialSchemaName }] }],
        }),
        isVisibleField,
    ]),
    sectionSchema("contact", [...titleBodyIconFields, optionalActionsField, isVisibleField]),
];

const sectionFields = (Object.keys(sections) as SectionKey[]).map((key) =>
    defineField({
        name: sections[key].id,
        title: `${sections[key].title} Section`,
        type: sectionSchemaName(key),
        options: collapsible,
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

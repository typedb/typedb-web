import { defineField, defineType } from "@sanity/types";
import { SanityOptionalActions } from "../button";
import {
    collapsibleOptions,
    isVisibleField,
    actionsFieldOptional,

    titleBodyIconFields,
    SanityVisibleToggle,
} from "../common-fields";
import { SanityTechnicolorBlock, TechnicolorBlock } from "../component/technicolor-block";
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

interface SanitySection extends SanityTitleBodyActions, SanityVisibleToggle {}

interface SanityCoreSection extends SanitySection, SanityTechnicolorBlock {}

interface SanityIntroSection extends SanityCoreSection, SanityOptionalActions {
    keyPoints: SanityServicesKeyPoint[];
}

interface SanityTestimonialsSection extends SanityCoreSection, SanityOptionalActions {
    testimonials: SanityReference<SanityTestimonial>[];
}

export class ServicesPage extends Page {
    readonly [sections.intro.id]?: IntroSection;
    readonly [sections.testimonials.id]?: TestimonialsSection;
    readonly [sections.contact.id]?: TechnicolorBlock;

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

class IntroSection extends TechnicolorBlock {
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

class ContactSection extends TechnicolorBlock {}

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
        actionsFieldOptional,
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

const servicesPageSchema = defineType({
    name: servicesPageSchemaName,
    title: "Services Page",
    type: "document",
    fields: [metaTagsField, ...sectionFields],
    preview: { prepare: (_selection) => ({ title: "Services Page" }) },
});

export const servicesPageSchemas = [servicesPageSchema, ...sectionSchemas];

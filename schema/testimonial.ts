import { BookIcon, HeartIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { actionsFieldOptional, authorField, collapsibleOptions, isVisibleField, SanityVisibleToggle, titleBodyActionsFields } from "./common-fields";
import { SanitySectionCore, SectionCore } from "./component/section";
import { Person, personSchemaName, SanityPerson } from "./person";
import { Document, SanityDataset, SanityReference } from "./sanity-core";
import { PropsOf } from "./util";

export interface SanityTestimonial extends SanityDocument {
    author: SanityReference<SanityPerson>;
    body: string;
}

export interface SanityTestimonialsSection extends SanitySectionCore {
    testimonials: SanityReference<SanityTestimonial>[];
}

export class Testimonial extends Document {
    readonly author: Person;
    readonly body: string;

    constructor(data: SanityTestimonial, db: SanityDataset) {
        super(data);
        this.author = Person.fromSanity(db.resolveRef(data.author), db);
        this.body = data.body;
    }
}

export class TestimonialsSection extends SectionCore {
    readonly testimonials: Testimonial[];

    constructor(props: PropsOf<TestimonialsSection>) {
        super(props);
        this.testimonials = props.testimonials;
    }

    static override fromSanity(data: SanityTestimonialsSection, db: SanityDataset) {
        return new TestimonialsSection(
            Object.assign(SectionCore.fromSanity(data, db), {
                testimonials: data.testimonials.map((x) => new Testimonial(db.resolveRef(x), db)),
            })
        );
    }
}

export const testimonialSchemaName = "testimonial";
export const testimonialsSectionSchemaName = "testimonialsSection";

const testimonialSchema = defineType({
    name: testimonialSchemaName,
    title: "Testimonial",
    type: "document",
    icon: HeartIcon,
    fields: [
        authorField,
        defineField({
            name: "body",
            title: "Body",
            type: "text",
        }),
    ],
    preview: {
        select: { authorName: "author.name", authorJobTitle: "author.jobTitle", authorCompany: "author.organisation.name", authorHeadshot: "author.headshot" },
        prepare: (selection) => ({
            title: selection.authorName,
            subtitle: `${selection.authorJobTitle}, ${selection.authorCompany}`,
            media: selection.authorHeadshot,
        }),
    },
});

export const testimonialsSectionField = defineField({
    name: testimonialsSectionSchemaName,
    title: `Testimonials Section`,
    type: testimonialsSectionSchemaName,
    options: collapsibleOptions,
});

const testimonialsSectionSchema = defineType({
    name: testimonialsSectionSchemaName,
    title: `Testimonials Section`,
    type: "object",
    fields: [
        ...titleBodyActionsFields,
        defineField({
            name: "testimonials",
            title: "Testimonials",
            type: "array",
            of: [{ type: "reference", to: [{ type: testimonialSchemaName }] }],
        }),
        isVisibleField,
    ],
});

export const testimonialSchemas = [testimonialSchema, testimonialsSectionSchema];

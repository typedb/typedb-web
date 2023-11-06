import { BookIcon, HeartIcon } from "@sanity/icons";
import { defineField, defineType, SanityDocument } from "@sanity/types";
import { authorField } from "./common-fields";
import { Person, personSchemaName, SanityPerson } from "./person";
import { Document, SanityDataset, SanityReference } from "./sanity-core";

export interface SanityTestimonial extends SanityDocument {
    author: SanityReference<SanityPerson>;
    body: string;
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

export const testimonialSchemaName = "testimonial";

export const testimonialSchema = defineType({
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

import { defineField, defineType, SanityDocument } from "@sanity/types";
import { headshotSchemaName, SanityImageRef } from "./image";
import { Organisation, organisationSchemaName, SanityOrganisation } from "./organisation";
import { Document, SanityDataset, SanityReference } from "./sanity-core";
import { SanityPortableText } from "./text";

export interface SanityWhitePaper extends SanityDocument {
    title: string;
    description: SanityPortableText;
    downloadURL: string;
    tags: string[];
}

export class Testimonial extends Document {
    readonly organisation: Organisation;
    readonly author: string;
    readonly headshotURL: string;
    readonly jobTitle: string;
    readonly body: string;

    constructor(data: SanityTestimonial, db: SanityDataset) {
        super(data);
        this.organisation = new Organisation(db.resolveRef(data.organisation), db);
        this.author = data.author;
        this.headshotURL = db.resolveImageRef(data.headshot).url;
        this.jobTitle = data.jobTitle;
        this.body = data.body;
    }
}

export const testimonialSchemaName = "testimonial";

export const testimonialSchema = defineType({
    name: testimonialSchemaName,
    title: "Testimonial",
    type: "document",
    fields: [
        defineField({
            name: "organisation",
            title: "Organisation",
            type: "reference",
            to: [{type: organisationSchemaName}],
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "string",
        }),
        defineField({
            name: "headshot",
            title: "Headshot",
            type: "reference",
            to: [{type: headshotSchemaName}],
        }),
        defineField({
            name: "jobTitle",
            title: "Job Title",
            type: "string",
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "text",
        }),
    ],
});

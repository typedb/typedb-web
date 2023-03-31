import { defineField, defineType } from "@sanity/types";
import { organisationSchemaName } from "./organisation";

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
            type: "image",
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

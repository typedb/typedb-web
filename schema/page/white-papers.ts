import { defineField, defineType } from "@sanity/types";
import { collapsibleOptions, pageTitleField, sectionIconField, titleAndBodyFields } from "../common-fields";
import { titleAndBodySchemaName } from "../text";

export const whitePapersPageSchemaName = "whitePapersPage";

const whitePapersPageSchema = defineType({
    name: whitePapersPageSchemaName,
    title: "White Papers Page",
    type: "document",
    fields: [
        pageTitleField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            type: titleAndBodySchemaName,
            options: collapsibleOptions,
        }),
        defineField({
            name: "featuredWhitePaper",
            title: "Featured White Paper",
            type: coreSectionSchemaName,
            options: collapsibleOptions,
        }),
        defineField({
            name: "exploreWebinarsSection",
            title: "Explore Webinars Section",
            description: "A searchable list of all our webinars will be displayed in this section",
            type: coreSectionSchemaName,
            options: collapsibleOptions,
        }),
    ],
    preview: {
        prepare: (_selection) => ({ title: "Webinars Page" }),
    },
});

export const webinarsPageSchemas = [coreSectionSchema, webinarsPageSchema];

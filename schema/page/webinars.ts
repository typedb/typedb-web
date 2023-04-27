import { defineField, defineType } from "@sanity/types";
import { collapsibleOptions, pageTitleField, sectionIconField, titleAndBodyFields } from "../common-fields";
import { titleAndBodySchemaName } from "../text";

export const webinarsPageSchemaName = "webinarsPage";

const coreSectionSchemaName = `${webinarsPageSchemaName}_coreSection`;

const coreSectionSchema = defineType({
    name: coreSectionSchemaName,
    title: "Section",
    type: "object",
    fields: [
        ...titleAndBodyFields,
        sectionIconField,
    ],
});

const webinarsPageSchema = defineType({
    name: webinarsPageSchemaName,
    title: "Webinars Page",
    type: "document",
    fields: [
        pageTitleField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            description: "The primary featured webinar will be displayed in this section",
            type: titleAndBodySchemaName,
            options: collapsibleOptions,
        }),
        defineField({
            name: "featuredWebinarsSection",
            title: "Featured Webinars Section",
            description: "The secondary featured webinars will be displayed in this section",
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

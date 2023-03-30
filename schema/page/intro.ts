import { defineField, defineType } from "@sanity/types";
import { bodyFieldRichText, collapsibleOptions, pageTitleField, titleFieldWithHighlights } from "../common-fields";
import { SanityBodyText, SanityTitleAndBody, SanityTitleWithHighlights, titleAndBodySchemaName, TitleBodyActionsSection, titleBodyActionsSectionSchemaName } from "../text";
import { schemaName } from "../util";
import { SanityPage } from "./common";

const introSection = "introSection";
const coreSections = "coreSections";

export interface SanityIntroPage extends SanityPage {
    [introSection]: SanityTitleAndBody;
}

interface SanityCoreSection extends SanityTitleWithHighlights, SanityBodyText {

}

export class IntroPage {
    readonly [introSection]: TitleBodyActionsSection;

    constructor(data: SanityIntroPage) {
        this.introSection = new TitleBodyActionsSection(data.introSection);
    }
}

export const introPageSchemaName = schemaName(IntroPage);

const introPageCoreSectionSchemaName = `${introPageSchemaName}_coreSection`;

const introPageCoreSectionSchema = defineType({
    name: introPageCoreSectionSchemaName,
    title: "Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
    ],
});

const introPageSchema = defineType({
    name: introPageSchemaName,
    title: "Introduction Page",
    type: "document",
    fields: [
        pageTitleField,
        defineField({
            name: introSection,
            title: "Intro Section",
            type: titleAndBodySchemaName,
            options: collapsibleOptions,
        }),
        defineField({
            name: coreSections,
            title: "Core Sections",
            type: "array",
            of: [{type: introPageCoreSectionSchemaName}],
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Introduction Page" }), },
});

export const introPageSchemas = [introPageCoreSectionSchema, introPageSchema];

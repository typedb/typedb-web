import { defineField, defineType } from "@sanity/types";
import { collapsibleOptions,  requiredRule } from "../common-fields";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { SanityTitleBodyIllustrationSection, TitleBodyIllustrationSection, titleBodyIllustrationSectionSchemaName } from "../component/page-section";
import { SanityDataset } from "../sanity-core";
import { SanityTitleBodyActions, TitleBodyActions, titleBodyActionsSectionSchemaName } from "../text";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityGenericPage extends SanityPage {
    introSection: SanityTitleBodyActions;
    coreSections: SanityTitleBodyIllustrationSection[];
    finalSection: SanityConclusionSection;
}

export class GenericPage extends Page {
    readonly introSection: TitleBodyActions;
    readonly coreSections: TitleBodyIllustrationSection[];
    readonly finalSection: ConclusionSection;

    constructor(data: SanityGenericPage, db: SanityDataset) {
        super(data, db);
        this.introSection = TitleBodyActions.fromSanityTitleBodyActions(data.introSection, db);
        this.coreSections = data.coreSections.map((x) => TitleBodyIllustrationSection.fromSanity(x, db));
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

export const genericPageSchemaName = "genericPage";

const genericPageSchema = defineType({
    name: genericPageSchemaName,
    title: "Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            type: titleBodyActionsSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "coreSections",
            title: "Core Sections",
            type: "array",
            of: [{ type: titleBodyIllustrationSectionSchemaName }],
            validation: requiredRule,
        }),
        defineField({
            name: "finalSection",
            title: "Final Section",
            type: conclusionSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Page" }) },
});

export const genericPageSchemas = [genericPageSchema];

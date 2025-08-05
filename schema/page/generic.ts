import { defineField, defineType } from "@sanity/types";
import { collapsibleOptions, requiredRule } from "../common-fields";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import {
    SanitySectionCore,
    SanityTitleBodyPanelSection, SectionCore, sectionCoreSchemaName,
    TitleBodyPanelSection,
    titleBodyPanelSectionSchemaName,
} from "../component/section";
import { SanityDataset } from "../sanity-core";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityGenericPage extends SanityPage {
    introSection: SanitySectionCore;
    coreSections: SanityTitleBodyPanelSection[];
    finalSection: SanityConclusionSection;
}

export class GenericPage extends Page {
    readonly introSection: SectionCore;
    readonly coreSections: TitleBodyPanelSection[];
    readonly finalSection: ConclusionSection;

    constructor(data: SanityGenericPage, db: SanityDataset) {
        super(data, db);
        this.introSection = SectionCore.fromSanity(data.introSection, db);
        this.coreSections = data.coreSections.map((x) => TitleBodyPanelSection.fromSanity(x, db));
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
            type: sectionCoreSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "coreSections",
            title: "Core Sections",
            type: "array",
            of: [{ type: titleBodyPanelSectionSchemaName }],
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

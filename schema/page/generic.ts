import { defineField, defineType } from "@sanity/types";
import { collapsible, required } from "../common-fields";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import {
    SanityTitleBodyPanelSection,
    TitleBodyPanelSection,
    titleBodyPanelSectionSchemaName,
} from "../component/section";
import { SanityDataset } from "../sanity-core";
import { SanityTitleBodyActions, TitleBodyActions, titleBodyActionsSectionSchemaName } from "../text";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityGenericPage extends SanityPage {
    introSection: SanityTitleBodyActions;
    coreSections: SanityTitleBodyPanelSection[];
    finalSection: SanityConclusionSection;
}

export class GenericPage extends Page {
    readonly introSection: TitleBodyActions;
    readonly coreSections: TitleBodyPanelSection[];
    readonly finalSection: ConclusionSection;

    constructor(data: SanityGenericPage, db: SanityDataset) {
        super(data, db);
        this.introSection = TitleBodyActions.fromSanity(data.introSection, db);
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
            type: titleBodyActionsSectionSchemaName,
            options: collapsible,
            validation: required,
        }),
        defineField({
            name: "coreSections",
            title: "Core Sections",
            type: "array",
            of: [{ type: titleBodyPanelSectionSchemaName }],
            validation: required,
        }),
        defineField({
            name: "finalSection",
            title: "Final Section",
            type: conclusionSectionSchemaName,
            options: collapsible,
            validation: required,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Page" }) },
});

export const genericPageSchemas = [genericPageSchema];

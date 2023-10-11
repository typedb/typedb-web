import { defineField, defineType } from "@sanity/types";
import { collapsibleOptions, pageTitleField, requiredRule } from "../common-fields";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { PublicationSection, publicationSectionSchemaName, SanityPublicationSection } from "../component/publication-panel";
import { SanityDataset } from "../sanity-core";
import { SanityTitleBodyActions, titleAndBodySchemaName, TitleBodyActions } from "../text";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityPhilosophyPage extends SanityPage {
    introSection: SanityTitleBodyActions;
    coreSections: SanityPublicationSection[];
    finalSection: SanityConclusionSection;
}

export class PhilosophyPage extends Page {
    readonly introSection: TitleBodyActions;
    readonly coreSections: PublicationSection[];
    readonly finalSection: ConclusionSection;

    constructor(data: SanityPhilosophyPage, db: SanityDataset) {
        super(data, db);
        this.introSection = TitleBodyActions.fromSanityTitleBodyActions(data.introSection, db);
        this.coreSections = data.coreSections.map((x) => PublicationSection.fromSanity(x, db));
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

export const philosophyPageSchemaName = "philosophyPage";

const philosophyPageSchema = defineType({
    name: philosophyPageSchemaName,
    title: "Philosophy Page",
    type: "document",
    fields: [
        pageTitleField,
        metaTagsField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            type: titleAndBodySchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
        defineField({
            name: "coreSections",
            title: "Core Sections",
            type: "array",
            of: [{ type: publicationSectionSchemaName }],
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
    preview: { prepare: (_selection) => ({ title: "Philosophy Page" }) },
});

export const philosophyPageSchemas = [philosophyPageSchema];

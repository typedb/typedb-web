import { defineField, defineType } from "@sanity/types";
import { collapsibleOptions, requiredRule } from "../common-fields";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { LinkPanelsSection, linkPanelsSectionSchemaName, SanityLinkPanelsSection, SanityTitleBodyPanelSection, TitleBodyPanelSection, titleBodyPanelSectionSchemaName } from "../component/page-section";
import { SanityDataset } from "../sanity-core";
import { Page, SanityPage } from "./common";
import { metaTagsField } from "./meta-tags";

export interface SanityStartupProgramPage extends SanityPage {
    introSection: SanityLinkPanelsSection;
    finalSection: SanityConclusionSection;
}

export class StartupProgramPage extends Page {
    readonly introSection?: LinkPanelsSection;
    readonly finalSection?: ConclusionSection;

    constructor(data: SanityStartupProgramPage, db: SanityDataset) {
        super(data, db);
        this.introSection = data.introSection.isVisible ? LinkPanelsSection.fromSanity(data.introSection, db) : undefined;
        this.finalSection = data.finalSection.isVisible ? ConclusionSection.fromSanity(data.finalSection, db) : undefined;
    }
}

export const startupProgramPageSchemaName = "startupProgramPage";

const startupProgramPageSchema = defineType({
    name: startupProgramPageSchemaName,
    title: "Startup Program Page",
    type: "document",
    fields: [
        metaTagsField,
        defineField({
            name: "introSection",
            title: "Intro Section",
            type: linkPanelsSectionSchemaName,
            options: collapsibleOptions,
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
    preview: { prepare: (_selection) => ({ title: "Startup Program Page" }) },
});

export const startupProgramPageSchemas = [startupProgramPageSchema];

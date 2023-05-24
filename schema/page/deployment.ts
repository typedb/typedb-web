import { defineField, defineType } from "@sanity/types";
import { collapsibleOptions, pageTitleField, requiredRule } from "../common-fields";
import { SanityConclusionSection } from "../component/conclusion-panel";
import { SanityTechnicolorBlock } from "../component/technicolor-block";
import { SanityDataset } from "../sanity-core";
import { SanityTitleBodyActions, SanityTitleBodyIllustrationSection, TitleBodyActions, titleBodyActionsSectionSchemaName, TitleBodyIllustrationSection, titleBodyIllustrationSectionSchemaName } from "../text";
import { SanityPage } from "./common";

export interface SanityDeploymentPage extends SanityPage {
    introSection: SanityIntroSection;
    comparisonTableSection: SanityComparisonTableSection;
    finalSection: SanityConclusionSection;
}

export interface SanityIntroSection extends SanityTechnicolorBlock {
    productPanels: ProductPanel[];
}

export interface SanityComparisonTableSection extends SanityTechnicolorBlock {
    comparisonTable: SanityComparisonTable;
}

export class GenericPage {
    readonly introSection: TitleBodyActions;
    readonly coreSections: TitleBodyIllustrationSection[];
    readonly finalSection: TitleBodyActions;

    constructor(data: SanityDeploymentPage, db: SanityDataset) {
        this.introSection = TitleBodyActions.fromSanityTitleBodyActions(data.introSection, db);
        this.coreSections = data.coreSections.map(x => TitleBodyIllustrationSection.fromSanityTitleBodyIllustrationSection(x, db));
        this.finalSection = TitleBodyActions.fromSanityTitleBodyActions(data.finalSection, db);
    }
}

export const genericPageSchemaName = "genericPage";

const genericPageSchema = defineType({
    name: genericPageSchemaName,
    title: "Page",
    type: "document",
    fields: [
        pageTitleField,
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
            of: [{type: titleBodyIllustrationSectionSchemaName}],
            validation: requiredRule,
        }),
        defineField({
            name: "finalSection",
            title: "Final Section",
            type: titleBodyActionsSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Page" }), },
});

export const genericPageSchemas = [genericPageSchema];

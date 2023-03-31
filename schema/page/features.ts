import { defineField, defineType } from "@sanity/types";
import { bodyFieldRichText, collapsibleOptions, optionalActionsField, pageTitleField, titleFieldWithHighlights } from "../common-fields";
import { OrganisationLogosStrip, organisationLogosStripField, SanityOrganisationLogosStrip } from "../organisation-logos-strip";
import { SanityDataset } from "../sanity-core";
import { SanityTitleAndBody, SanityTitleBodyActionsSection, TitleAndBody, TitleBodyActionsSection } from "../text";
import { schemaName } from "../util";
import { SanityPage } from "./common";

const introSection = "introSection";
const coreSections = "coreSections";

export interface SanityFeaturesPage extends SanityPage {
    [introSection]: SanityIntroSection;
    [coreSections]: SanityCoreSection[];
}

interface SanityIntroSection extends SanityTitleBodyActionsSection {
    userLogos: SanityOrganisationLogosStrip;
}

interface SanityCoreSection extends SanityTitleAndBody {

}

export class FeaturesPage {
    readonly [introSection]: IntroSection;
    readonly [coreSections]: CoreSection[];

    constructor(data: SanityFeaturesPage, db: SanityDataset) {
        this.introSection = new IntroSection(data.introSection, db);
        this.coreSections = data.coreSections.map(x => new CoreSection(x));
    }
}

class IntroSection extends TitleBodyActionsSection {
    readonly userLogos: OrganisationLogosStrip;

    constructor(data: SanityIntroSection, db: SanityDataset) {
        super(data);
        this.userLogos = new OrganisationLogosStrip(data.userLogos, db);
    }
}

class CoreSection extends TitleAndBody {

}

export const featuresPageSchemaName = schemaName(FeaturesPage);

const introSectionSchemaName = `${featuresPageSchemaName}_introSection`;

const introSectionSchema = defineType({
    name: introSectionSchemaName,
    title: "Intro Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        optionalActionsField,
        Object.assign({}, organisationLogosStripField, { name: "userLogos", title: "User Logos" }),
    ],
});

const coreSectionSchemaName = `${featuresPageSchemaName}_coreSection`;

const coreSectionSchema = defineType({
    name: coreSectionSchemaName,
    title: "Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
    ],
});

const featuresPageSchema = defineType({
    name: featuresPageSchemaName,
    title: "Features Page",
    type: "document",
    fields: [
        pageTitleField,
        defineField({
            name: introSection,
            title: "Intro Section",
            type: introSectionSchemaName,
            options: collapsibleOptions,
        }),
        defineField({
            name: coreSections,
            title: "Core Sections",
            type: "array",
            of: [{type: coreSectionSchemaName}],
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Features Page" }), },
});

export const featuresPageSchemas = [coreSectionSchema, featuresPageSchema, introSectionSchema];

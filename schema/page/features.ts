import { defineField, defineType } from "@sanity/types";
import { Link, SanityActions, SanityLink } from "../action";
import { bodyFieldRichText, collapsibleOptions, isVisibleField, optionalActionsField, pageTitleField, sectionIconField, titleFieldWithHighlights } from "../common-fields";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { SanityDataset } from "../sanity-core";
import { RichText, SanityBodyText, SanityTitle, SanityTitleAndBody, SanityTitleBodyActionsSection, TitleAndBody, TitleBodyActionsSection, titleBodyActionsSectionSchemaName } from "../text";
import { schemaName } from "../util";
import { SanityPage } from "./common";

const introSection = "introSection";
const coreSections = "coreSections";
const secondaryActions = "secondaryActions";
const finalSection = "finalSection";

export interface SanityFeaturesPage extends SanityPage {
    [introSection]: SanityIntroSection;
    [coreSections]: SanityCoreSection[];
    [secondaryActions]: SanityActions;
    [finalSection]: SanityTitleBodyActionsSection;
}

interface SanityIntroSection extends SanityTitleBodyActionsSection {
    userLogos: SanityOrganisation[];
}

interface SanityFeaturePanel extends SanityTitle, SanityBodyText {
    documentationLink: SanityLink;
}

interface SanityCoreSection extends SanityTitleAndBody {
    features: SanityFeaturePanel[];
}

export class FeaturesPage {
    readonly [introSection]: IntroSection;
    readonly [coreSections]: CoreSection[];
    // readonly [secondaryActions]: Action[];
    readonly [finalSection]: TitleBodyActionsSection;

    constructor(data: SanityFeaturesPage, db: SanityDataset) {
        this.introSection = new IntroSection(data.introSection, db);
        this.coreSections = data.coreSections.map(x => new CoreSection(x));
        this.finalSection = new TitleBodyActionsSection(data.finalSection);
    }
}

class IntroSection extends TitleBodyActionsSection {
    readonly userLogos: Organisation[];

    constructor(data: SanityIntroSection, db: SanityDataset) {
        super(data);
        this.userLogos = data.userLogos.map(x => new Organisation(x, db));
    }
}

class FeaturePanel {
    readonly title: string;
    readonly body: RichText;
    readonly documentationLink: Link;

    constructor(data: SanityFeaturePanel) {
        this.title = data.title;
        this.body = new RichText(data.body);
        this.documentationLink = new Link(data.documentationLink);
    }
}

class CoreSection extends TitleAndBody {
    features: FeaturePanel[];

    constructor(data: SanityCoreSection) {
        super(data);
        this.features = data.features.map(x => new FeaturePanel(x));
    }
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
        Object.assign({}, organisationLogosField, { name: "userLogos", title: "User Logos" }) as any,
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
        sectionIconField,
        isVisibleField,
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
        Object.assign({}, optionalActionsField, { name: secondaryActions, title: "Secondary Actions", description: "Displayed after the final feature section" }),
        defineField({
            name: finalSection,
            title: "Final Section",
            type: titleBodyActionsSectionSchemaName,
            options: collapsibleOptions,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Features Page" }), },
});

export const featuresPageSchemas = [coreSectionSchema, featuresPageSchema, introSectionSchema];

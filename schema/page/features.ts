import { ArrayRule, defineField, defineType, Reference } from "@sanity/types";
import { Action, SanityActions } from "../action";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "../component/content-text-panel";
import { bodyFieldRichText, collapsibleOptions, isVisibleField, optionalActionsField, pageTitleField, sectionIconField, titleFieldWithHighlights } from "../common-fields";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { SanityDataset } from "../sanity-core";
import { SanityTitleAndBody, SanityTitleBodyActionsSection, TitleAndBody, TitleBodyActionsSection, titleBodyActionsSectionSchemaName } from "../text";
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
    userLogos: Reference[];
}

interface SanityCoreSection extends SanityTitleAndBody {
    icon: Reference;
    panels: SanityContentTextPanel[];
}

export class FeaturesPage {
    readonly [introSection]: IntroSection;
    readonly [coreSections]: FeaturesPageCoreSection[];
    readonly [secondaryActions]: Action[];
    readonly [finalSection]: TitleBodyActionsSection;

    constructor(data: SanityFeaturesPage, db: SanityDataset) {
        this.introSection = new IntroSection(data.introSection, db);
        this.coreSections = data.coreSections.map(x => new FeaturesPageCoreSection(x, db));
        this.secondaryActions = data.secondaryActions.map(x => new Action(x, db));
        this.finalSection = new TitleBodyActionsSection(data.finalSection, db);
    }
}

class IntroSection extends TitleBodyActionsSection {
    readonly userLogos: Organisation[];

    constructor(data: SanityIntroSection, db: SanityDataset) {
        super(data, db);
        this.userLogos = data.userLogos.map(x => new Organisation(db.resolveRef(x), db));
    }
}

export class FeaturesPageCoreSection extends TitleAndBody {
    readonly iconURL: string;
    readonly panels: ContentTextPanel[];

    constructor(data: SanityCoreSection, db: SanityDataset) {
        super(data);
        this.iconURL = db.resolveImageRef(data.icon).url;
        this.panels = data.panels.map(x => new ContentTextPanel(x, db));
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
        defineField({
            name: "panels",
            title: "Panels",
            type: "array",
            of: [{type: contentTextPanelSchemaName}],
            validation: (rule: ArrayRule<any>) => rule.required().min(1).max(4),
        }),
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

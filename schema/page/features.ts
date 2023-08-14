import { ArrayRule, defineField, defineType } from "@sanity/types";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "../component/content-text-panel";
import { bodyFieldRichText, collapsibleOptions, isVisibleField, optionalActionsField, pageTitleField, sectionIconField, titleFieldWithHighlights } from "../common-fields";
import { SanityTechnicolorBlock, TechnicolorBlock } from "../component/technicolor-block";
import { Organisation, organisationLogosField, SanityOrganisation } from "../organisation";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SanityTitleBodyActions, TitleBodyActions, titleBodyActionsSectionSchemaName } from "../text";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";

const introSection = "introSection";
const coreSections = "coreSections";
const finalSection = "finalSection";

export interface SanityFeaturesPage extends SanityPage {
    [introSection]: SanityIntroSection;
    [coreSections]: SanityCoreSection[];
    [finalSection]: SanityConclusionSection;
}

interface SanityIntroSection extends SanityTitleBodyActions {
    userLogos: SanityReference<SanityOrganisation>[];
}

interface SanityCoreSection extends SanityTechnicolorBlock {
    panels: SanityContentTextPanel[];
}

export class FeaturesPage extends Page {
    readonly [introSection]: IntroSection;
    readonly [coreSections]: FeaturesPageCoreSection[];
    readonly [finalSection]: ConclusionSection;

    constructor(data: SanityFeaturesPage, db: SanityDataset) {
        super(data);
        this.introSection = IntroSection.fromSanityIntroSection(data.introSection, db);
        this.coreSections = data.coreSections.map(x => FeaturesPageCoreSection.fromSanity(x, db));
        this.finalSection = ConclusionSection.fromSanity(data.finalSection, db);
    }
}

class IntroSection extends TitleBodyActions {
    readonly userLogos: Organisation[];

    constructor(props: PropsOf<IntroSection>) {
        super(props);
        this.userLogos = props.userLogos;
    }

    static fromSanityIntroSection(data: SanityIntroSection, db: SanityDataset) {
        return Object.assign(TitleBodyActions.fromSanityTitleBodyActions(data, db), {
            userLogos: data.userLogos.map(x => new Organisation(db.resolveRef(x), db))
        });
    }
}

export class FeaturesPageCoreSection extends TechnicolorBlock {
    readonly panels: ContentTextPanel[];

    constructor(props: PropsOf<FeaturesPageCoreSection>) {
        super(props);
        this.panels = props.panels;
    }

    static override fromSanity(data: SanityCoreSection, db: SanityDataset) {
        return Object.assign(TechnicolorBlock.fromSanity(data, db), {
            panels: data.panels.map(x => new ContentTextPanel(x, db))
        });
    }
}

export const featuresPageSchemaName = "featuresPage";

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
            title: "Content Tabs",
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
        defineField({
            name: finalSection,
            title: "Final Section",
            type: conclusionSectionSchemaName,
            options: collapsibleOptions,
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Features Page" }), },
});

export const featuresPageSchemas = [coreSectionSchema, featuresPageSchema, introSectionSchema];

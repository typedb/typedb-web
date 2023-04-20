import { ArrayRule, defineField, defineType, Reference } from "@sanity/types";
import { bodyFieldRichText, collapsibleOptions, isVisibleField, pageTitleField, sectionIconField, titleFieldWithHighlights } from "../common-fields";
import { ContentPanel, contentPanelSchemaName, contentTextPanelSchemaName, SanityContentPanel } from "../component/content-text-panel";
import { SanityDataset } from "../sanity-core";
import { SanityTitleAndBody, SanityTitleBodyActionsSection, TitleAndBody, titleAndBodySchemaName, TitleBodyActionsSection } from "../text";
import { schemaName } from "../util";
import { SanityPage } from "./common";

const introSection = "introSection";
const coreSections = "coreSections";

export interface SanityIntroPage extends SanityPage {
    [introSection]: SanityTitleBodyActionsSection;
    [coreSections]: SanityCoreSection[];
}

interface SanityCoreSection extends SanityTitleAndBody {
    icon: Reference;
    contentTabs: SanityContentPanel[];
}

export class IntroPage {
    readonly [introSection]: TitleBodyActionsSection;
    readonly [coreSections]: IntroPageCoreSection[];

    constructor(data: SanityIntroPage, db: SanityDataset) {
        this.introSection = new TitleBodyActionsSection(data.introSection, db);
        this.coreSections = data.coreSections.map(x => new IntroPageCoreSection(x, db));
    }
}

export class IntroPageCoreSection extends TitleAndBody {
    readonly iconURL: string;
    readonly contentTabs: ContentPanel[];

    constructor(data: SanityCoreSection, db: SanityDataset) {
        super(data);
        this.iconURL = db.resolveImageRef(data.icon).url;
        this.contentTabs = data.contentTabs.map(x => new ContentPanel(x));
    }
}

export const introPageSchemaName = "introPage";

const introPageCoreSectionSchemaName = `${introPageSchemaName}_coreSection`;

const introPageCoreSectionSchema = defineType({
    name: introPageCoreSectionSchemaName,
    title: "Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        sectionIconField,
        defineField({
            name: "contentTabs",
            title: "Content Tabs",
            type: "array",
            of: [{type: contentPanelSchemaName}],
            validation: (rule: ArrayRule<any>) => rule.required(),
        }),
        isVisibleField,
    ],
});

const introPageSchema = defineType({
    name: introPageSchemaName,
    title: "Introduction Page",
    type: "document",
    fields: [
        pageTitleField,
        defineField({
            name: introSection,
            title: "Intro Section",
            type: titleAndBodySchemaName,
            options: collapsibleOptions,
        }),
        defineField({
            name: coreSections,
            title: "Core Sections",
            type: "array",
            of: [{type: introPageCoreSectionSchemaName}],
        }),
    ],
    preview: { prepare: (_selection) => ({ title: "Introduction Page" }), },
});

export const introPageSchemas = [introPageCoreSectionSchema, introPageSchema];

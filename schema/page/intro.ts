import { ArrayRule, defineField, defineType } from "@sanity/types";
import { bodyFieldRichText, collapsibleOptions, isVisibleField, pageTitleField, sectionIconField, titleFieldWithHighlights } from "../common-fields";
import { ContentPanel, contentPanelSchemaName, SanityContentPanel } from "../component/content-text-panel";
import { TechnicolorBlock } from "../component/technicolor-block";
import { SanityImageRef } from "../image";
import { SanityDataset, SanityReference } from "../sanity-core";
import { SanityTitleAndBody, SanityTitleBodyActions, TitleAndBody, titleAndBodySchemaName, TitleBodyActions } from "../text";
import { PropsOf } from "../util";
import { SanityPage } from "./common";

const introSection = "introSection";
const coreSections = "coreSections";

export interface SanityIntroPage extends SanityPage {
    [introSection]: SanityTitleBodyActions;
    [coreSections]: SanityCoreSection[];
}

interface SanityCoreSection extends SanityTitleAndBody {
    icon: SanityReference<SanityImageRef>;
    contentTabs: SanityContentPanel[];
}

export class IntroPage {
    readonly [introSection]: TitleBodyActions;
    readonly [coreSections]: IntroPageCoreSection[];

    constructor(data: SanityIntroPage, db: SanityDataset) {
        this.introSection = TitleBodyActions.fromSanityTitleBodyActions(data.introSection, db);
        this.coreSections = data.coreSections.map(x => IntroPageCoreSection.fromSanityCoreSection(x, db));
    }
}

export class IntroPageCoreSection extends TechnicolorBlock {
    readonly contentTabs: ContentPanel[];

    constructor(props: PropsOf<IntroPageCoreSection>) {
        super(props);
        this.contentTabs = props.contentTabs;
    }

    static fromSanityCoreSection(data: SanityCoreSection, db: SanityDataset) {
        return new IntroPageCoreSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            contentTabs: data.contentTabs.map(x => new ContentPanel(x))
        }));
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

import { defineField, defineType } from "@sanity/types";
import { bodyFieldRichText, collapsibleOptions, isVisibleField, pageTitleField, requiredRule, SanityVisibleToggle, sectionIconField, titleFieldWithHighlights } from "../common-fields";
import { ConclusionSection, conclusionSectionSchemaName, SanityConclusionSection } from "../component/conclusion-panel";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "../component/content-text-panel";
import { SanityTechnicolorBlock, TechnicolorBlock } from "../component/technicolor-block";
import { SanityDataset } from "../sanity-core";
import { RichText, SanityPortableText, SanityTitleBodyActions, titleAndBodySchemaName, TitleBodyActions } from "../text";
import { PropsOf } from "../util";
import { Page, SanityPage } from "./common";

export interface SanityIntroPage extends SanityPage {
    introSection: SanityTitleBodyActions;
    coreSections: SanityCoreSection[];
    finalSection: SanityConclusionSection;
}

interface SanityCoreSection extends SanityTechnicolorBlock, SanityVisibleToggle {
    contentTabs: SanityContentTextPanel[];
    longText: SanityPortableText;
}

export class IntroPage extends Page {
    readonly introSection: TitleBodyActions;
    readonly coreSections: IntroPageCoreSection[];
    readonly finalSection: ConclusionSection;

    constructor(data: SanityIntroPage, db: SanityDataset) {
        super(data);
        this.introSection = TitleBodyActions.fromSanityTitleBodyActions(data.introSection, db);
        this.coreSections = data.coreSections.map(x => IntroPageCoreSection.fromSanityCoreSection(x, db));
        this.finalSection = ConclusionSection.fromSanityConclusionSection(data.finalSection, db);
    }
}

export class IntroPageCoreSection extends TechnicolorBlock {
    readonly contentTabs: ContentTextPanel[];
    readonly longText: RichText;

    constructor(props: PropsOf<IntroPageCoreSection>) {
        super(props);
        this.contentTabs = props.contentTabs;
        this.longText = props.longText;
    }

    static fromSanityCoreSection(data: SanityCoreSection, db: SanityDataset) {
        return new IntroPageCoreSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            contentTabs: data.contentTabs.map(x => new ContentTextPanel(x, db)),
            longText: new RichText(data.longText),
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
            of: [{type: contentTextPanelSchemaName}],
            validation: requiredRule,
        }),
        defineField({
            name: "longText",
            title: "Long Text",
            type: "array",
            of: [{type: "block"}],
            validation: requiredRule,
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
            of: [{type: introPageCoreSectionSchemaName}],
            validation: requiredRule,
        }),
        defineField({
            name: "finalSection",
            title: "Final Section",
            type: conclusionSectionSchemaName,
            options: collapsibleOptions,
            validation: requiredRule,
        })
    ],
    preview: { prepare: (_selection) => ({ title: "Introduction Page" }), },
});

export const introPageSchemas = [introPageCoreSectionSchema, introPageSchema];

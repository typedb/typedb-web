import { defineField, defineType } from "@sanity/types";
import { LinkButton } from "../button";
import {
    isVisibleField, actionsFieldOptional, resourcesFieldOptional, SanityVisibleToggle, titleBodyIconFields, SanityIconField, keywordFieldOptional, titleField,
} from "../common-fields";
import { Illustration, illustrationFieldOptional, illustrationFromSanity, SanityIllustration } from "../illustration";
import { SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, ParagraphWithHighlights, PortableText, SanityTitleBodyActions } from "../text";
import { PropsOf } from "../util";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "./content-text-panel";
import { LinkPanel, linkPanelSchemaName, SanityLinkPanel } from "./link-panel";

export interface SanitySectionBase extends SanityTitleBodyActions, SanityIconField {
    keyword?: string;
}

export interface SanityCoreSection extends SanitySectionBase, SanityVisibleToggle {}

export interface SanityTitleBodyPanelSection extends SanityCoreSection {
    panel: SanityContentTextPanel;
}

export interface SanityLinkPanelsSection extends SanityCoreSection {
    panels: SanityLinkPanel[];
}

export interface SanitySimpleLinkPanelsSection extends SanityCoreSection {
    panels: SanityTextLink[];
}

export interface SanityTitleBodyIllustrationSection extends SanityCoreSection {
    illustration: SanityReference<SanityIllustration>;
}

export class SectionBase implements Partial<BodyTextField> {
    readonly title: ParagraphWithHighlights;
    readonly body?: PortableText;
    readonly actions?: LinkButton[];
    readonly sectionId: string;
    readonly keyword?: string;

    constructor(props: PropsOf<SectionBase>) {
        this.title = props.title;
        this.body = props.body;
        this.actions = props.actions;
        this.sectionId = props.sectionId;
        this.keyword = props.keyword;
    }

    static fromSanity(data: SanitySectionBase, db: SanityDataset) {
        const title = ParagraphWithHighlights.fromSanity(data.title);
        return new SectionBase({
            title: title,
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            sectionId: title.toSectionID(),
            keyword: data.keyword,
        });
    }
}

export class TitleBodyPanelSection extends SectionBase {
    readonly panel: ContentTextPanel;

    constructor(props: PropsOf<TitleBodyPanelSection>) {
        super(props);
        this.panel = props.panel;
    }

    static override fromSanity(data: SanityTitleBodyPanelSection, db: SanityDataset) {
        return new TitleBodyPanelSection({
            ...SectionBase.fromSanity(data, db),
            panel: new ContentTextPanel(data.panel, db),
        });
    }
}

export class LinkPanelsSection extends SectionBase {
    readonly panels: LinkPanel[];

    constructor(props: PropsOf<LinkPanelsSection>) {
        super(props);
        this.panels = props.panels;
    }

    static override fromSanity(data: SanityLinkPanelsSection, db: SanityDataset) {
        return new LinkPanelsSection({
            ...super.fromSanity(data, db),
            panels: data.panels.map((x) => LinkPanel.fromSanity(x, db)),
        });
    }
}

export class SimpleLinkPanelsSection extends SectionBase {
    readonly panels: TextLink[];

    constructor(props: PropsOf<SimpleLinkPanelsSection>) {
        super(props);
        this.panels = props.panels;
    }

    static override fromSanity(data: SanitySimpleLinkPanelsSection, db: SanityDataset) {
        return new SimpleLinkPanelsSection({
            ...super.fromSanity(data, db),
            panels: data.panels.map((x) => TextLink.fromSanityTextLink(x, db)!),
        });
    }
}

export class TitleBodyIllustrationSection extends SectionBase {
    readonly illustration?: Illustration;

    constructor(props: PropsOf<TitleBodyIllustrationSection>) {
        super(props);
        this.illustration = props.illustration;
    }

    static override fromSanity(data: SanityTitleBodyIllustrationSection, db: SanityDataset) {
        return new TitleBodyIllustrationSection({
            ...SectionBase.fromSanity(data, db),
            illustration: data.illustration ? illustrationFromSanity(db.resolveRef(data.illustration), db) : undefined,
        });
    }
}

export const coreSectionSchemaName = "coreSection";

const coreSectionSchema = defineType({
    name: coreSectionSchemaName,
    title: "Section",
    type: "document",
    fields: [...titleBodyIconFields, keywordFieldOptional, isVisibleField],
});

export const titleBodyPanelSectionSchemaName = "titleBodyPanelSection";

const titleBodyPanelSectionSchema = defineType({
    name: titleBodyPanelSectionSchemaName,
    title: "Title, Body & Panel",
    type: "document",
    fields: [
        ...titleBodyIconFields,
        actionsFieldOptional,
        {
            title: "Panel",
            name: "panel",
            type: contentTextPanelSchemaName,
        },
        isVisibleField,
    ],
});

export const resourceSectionSchemaName = `resourceSection`;

const resourceSectionSchema = defineType({
    name: resourceSectionSchemaName,
    title: "Resources Section",
    type: "object",
    fields: [...titleBodyIconFields, actionsFieldOptional, keywordFieldOptional, resourcesFieldOptional, isVisibleField],
});

export const linkPanelsSectionSchemaName = `linkPanelsSection`;

const linkPanelsSectionSchema = defineType({
    name: linkPanelsSectionSchemaName,
    title: "Link Panels Section",
    type: "object",
    fields: [
        ...titleBodyIconFields,
        actionsFieldOptional,
        keywordFieldOptional,
        defineField({
            name: "panels",
            title: "Panels",
            type: "array",
            of: [{ type: linkPanelSchemaName }],
            validation: (rule) => rule.required().length(3),
        }),
        isVisibleField,
    ],
});

export const simpleLinkPanelsSectionSchemaName = `simpleLinkPanelsSection`;

const simpleLinkPanelsSectionSchema = defineType({
    name: simpleLinkPanelsSectionSchemaName,
    title: "Simple Link Panels Section",
    type: "object",
    fields: [
        ...titleBodyIconFields,
        actionsFieldOptional,
        keywordFieldOptional,
        defineField({
            name: "panels",
            title: "Panels",
            type: "array",
            of: [{ type: textLinkSchemaName }],
            validation: (rule) => rule.required(),
        }),
        isVisibleField,
    ],
});

const titleBodyIllustrationSectionSchema = defineType({
    name: 'titleBodyIllustrationSection',
    title: 'Title, Body & Illustration',
    type: 'document',
    fields: [
        ...titleBodyIconFields,
        actionsFieldOptional,
        illustrationFieldOptional,
        isVisibleField,
    ],
});

export const pageSectionSchemas = [
    coreSectionSchema, 
    resourceSectionSchema, 
    titleBodyPanelSectionSchema, 
    linkPanelsSectionSchema,
    simpleLinkPanelsSectionSchema,
    titleBodyIllustrationSectionSchema,
];

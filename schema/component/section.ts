import { defineField, defineType } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "../button";
import {
    isVisibleField, resourcesFieldOptional, SanityVisibleToggle, keywordFieldOptional,
    titleBodyActionsFields,
} from "../common-fields";
import { Illustration, illustrationFieldOptional, illustrationFromSanity, SanityIllustration } from "../illustration";
import { SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, ParagraphWithHighlights, PortableText, SanityTitleAndBody } from "../text";
import { PropsOf } from "../util";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "./content-text-panel";
import { LinkPanel, linkPanelSchemaName, SanityLinkPanel } from "./link-panel";

export interface SanitySectionCore extends SanityTitleAndBody, SanityOptionalActions, SanityVisibleToggle {}

export interface SanityTitleBodyPanelSection extends SanitySectionCore {
    panel: SanityContentTextPanel;
}

export interface SanityLinkPanelsSection extends SanitySectionCore {
    panels: SanityLinkPanel[];
}

export interface SanitySimpleLinkPanelsSection extends SanitySectionCore {
    panels: SanityTextLink[];
}

export interface SanityIllustrationSection extends SanitySectionCore {
    illustration: SanityReference<SanityIllustration>;
}

export class SectionCore implements Partial<BodyTextField> {
    readonly title: ParagraphWithHighlights;
    readonly body?: PortableText;
    readonly actions?: LinkButton[];
    readonly sectionId: string;

    constructor(props: PropsOf<SectionCore>) {
        this.title = props.title;
        this.body = props.body;
        this.actions = props.actions;
        this.sectionId = props.sectionId;
    }

    static fromSanity(data: SanitySectionCore, db: SanityDataset) {
        const title = ParagraphWithHighlights.fromSanity(data.title);
        return new SectionCore({
            title: title,
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            sectionId: title.toSectionID(),
        });
    }
}

export class TitleBodyPanelSection extends SectionCore {
    readonly panel: ContentTextPanel;

    constructor(props: PropsOf<TitleBodyPanelSection>) {
        super(props);
        this.panel = props.panel;
    }

    static override fromSanity(data: SanityTitleBodyPanelSection, db: SanityDataset) {
        return new TitleBodyPanelSection({
            ...SectionCore.fromSanity(data, db),
            panel: new ContentTextPanel(data.panel, db),
        });
    }
}

export class LinkPanelsSection extends SectionCore {
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

export class SimpleLinkPanelsSection extends SectionCore {
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

export class IllustrationSection extends SectionCore {
    readonly illustration?: Illustration;

    constructor(props: PropsOf<IllustrationSection>) {
        super(props);
        this.illustration = props.illustration;
    }

    static override fromSanity(data: SanityIllustrationSection, db: SanityDataset) {
        return new IllustrationSection({
            ...SectionCore.fromSanity(data, db),
            illustration: data.illustration ? illustrationFromSanity(db.resolveRef(data.illustration), db) : undefined,
        });
    }
}

export const sectionCoreSchemaName = "coreSection";

const coreSectionSchema = defineType({
    name: sectionCoreSchemaName,
    title: "Section",
    type: "document",
    fields: [...titleBodyActionsFields, keywordFieldOptional, isVisibleField],
});

export const titleBodyPanelSectionSchemaName = "titleBodyPanelSection";

const titleBodyPanelSectionSchema = defineType({
    name: titleBodyPanelSectionSchemaName,
    title: "Title, Body & Panel",
    type: "document",
    fields: [
        ...titleBodyActionsFields,
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
    fields: [...titleBodyActionsFields, keywordFieldOptional, resourcesFieldOptional, isVisibleField],
});

export const linkPanelsSectionSchemaName = `linkPanelsSection`;

const linkPanelsSectionSchema = defineType({
    name: linkPanelsSectionSchemaName,
    title: "Link Panels Section",
    type: "object",
    fields: [
        ...titleBodyActionsFields,
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
        ...titleBodyActionsFields,
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

export const titleBodyIllustrationSectionSchemaName = "titleBodyIllustrationSection";

const titleBodyIllustrationSectionSchema = defineType({
    name: titleBodyIllustrationSectionSchemaName,
    title: 'Title, Body & Illustration',
    type: 'document',
    fields: [
        ...titleBodyActionsFields,
        illustrationFieldOptional,
        isVisibleField,
    ],
});

export const pageSectionSchemas = [
    coreSectionSchema, resourceSectionSchema, titleBodyPanelSectionSchema, linkPanelsSectionSchema,
    simpleLinkPanelsSectionSchema, titleBodyIllustrationSectionSchema,
];

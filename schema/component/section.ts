import { defineField, defineType } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "../button";
import {
    isVisibleField, resourcesFieldOptional, SanityVisibleToggle, keywordFieldOptional,
    titleBodyActionsFields, collapsibleOptions, titleFieldWithHighlights, resourcesField,
    actionsFieldOptional, sectionLayoutDirectionField, SectionLayoutDirection, sectionWidthField, SectionWidth,
    titleWithHighlightsPreview,
} from "../common-fields";
import { Illustration, illustrationFieldOptional, illustrationFieldValueFromSanity, SanityIllustrationFieldValue } from "../illustration";
import { SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import type { SanityResource } from "../resource/sanity";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, ParagraphWithHighlights, PortableText, SanityTitleAndBody } from "../text";
import { PropsOf } from "../util";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "./content-text-panel";
import { LinkPanel, linkPanelSchemaName, SanityLinkPanel } from "./link-panel";

export interface SanitySectionCore extends SanityTitleAndBody, SanityOptionalActions, SanityVisibleToggle {
    width?: SectionWidth;
}

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
    illustration?: SanityIllustrationFieldValue;
    layoutDirection?: SectionLayoutDirection;
}

export interface SanityHotTopicsSection extends SanitySectionCore {
    hotTopics: SanityReference<SanityResource>[];
}

export class SectionCore implements Partial<BodyTextField> {
    readonly title: ParagraphWithHighlights;
    readonly body?: PortableText;
    readonly actions?: LinkButton[];
    readonly sectionId: string;
    readonly width: SectionWidth;

    constructor(props: PropsOf<SectionCore>) {
        this.title = props.title;
        this.body = props.body;
        this.actions = props.actions;
        this.sectionId = props.sectionId;
        this.width = props.width;
    }

    static fromSanity(data: SanitySectionCore, db: SanityDataset) {
        const title = ParagraphWithHighlights.fromSanity(data.title);
        return new SectionCore({
            title: title,
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            sectionId: title.toSectionID(),
            width: data.width || "default",
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
    readonly layoutDirection: SectionLayoutDirection;

    constructor(props: PropsOf<IllustrationSection>) {
        super(props);
        this.illustration = props.illustration;
        this.layoutDirection = props.layoutDirection;
    }

    static override fromSanity(data: SanityIllustrationSection, db: SanityDataset) {
        return new IllustrationSection({
            ...SectionCore.fromSanity(data, db),
            illustration: data.illustration ? illustrationFieldValueFromSanity(data.illustration, db) : undefined,
            layoutDirection: data.layoutDirection || "auto",
        });
    }
}

export const sectionCoreSchemaName = "coreSection";

const coreSectionSchema = defineType({
    name: sectionCoreSchemaName,
    title: "Section",
    type: "document",
    fields: [...titleBodyActionsFields, keywordFieldOptional, sectionWidthField, isVisibleField],
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
        sectionWidthField,
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
        sectionWidthField,
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
        sectionWidthField,
        isVisibleField,
    ],
});

export const illustrationSectionSchemaName = "titleBodyIllustrationSection";

const titleBodyIllustrationSectionSchema = defineType({
    name: illustrationSectionSchemaName,
    title: 'Title, Body & Illustration',
    type: 'document',
    fields: [
        ...titleBodyActionsFields,
        illustrationFieldOptional,
        sectionLayoutDirectionField,
        sectionWidthField,
        isVisibleField,
    ],
});

export const hotTopicsSectionSchemaName = "hotTopicsSection";

export const hotTopicsSectionSchema = defineType({
    name: hotTopicsSectionSchemaName,
    title: "Hot Topics Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        Object.assign({}, resourcesField, { name: "hotTopics", title: "Hot Topics" }),
        actionsFieldOptional,
        isVisibleField,
    ],
    preview: {
        select: { title: "title" },
        prepare: (selection) => ({
            title: titleWithHighlightsPreview(selection.title),
            subtitle: "Hot Topics / Related Articles",
        }),
    },
});

export const pageSectionSchemas = [
    coreSectionSchema, resourceSectionSchema, titleBodyPanelSectionSchema, linkPanelsSectionSchema,
    simpleLinkPanelsSectionSchema, titleBodyIllustrationSectionSchema, hotTopicsSectionSchema,
];

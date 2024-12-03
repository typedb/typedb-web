import { defineField, defineType } from "@sanity/types";
import {
    bodyFieldRichText,
    isVisibleField, actionsFieldOptional, resourcesFieldOptional, SanityVisibleToggle, sectionIconField, titleBodyIconFields, titleFieldWithHighlights,
} from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { LinkPanelWithIcon, linkPanelWithIconSchemaName, SanityLinkPanelWithIcon } from "./link-panel";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "./content-text-panel";

export interface SanityCoreSection extends SanityTechnicolorBlock, SanityVisibleToggle {}

export interface SanityTitleBodyPanelSection extends SanityCoreSection {
    panel: SanityContentTextPanel;
}

export interface SanityLinkPanelsSection extends SanityCoreSection {
    panels: SanityLinkPanelWithIcon[];
}

export class TitleBodyPanelSection extends TechnicolorBlock {
    readonly panel: ContentTextPanel;

    constructor(props: PropsOf<TitleBodyPanelSection>) {
        super(props);
        this.panel = props.panel;
    }

    static override fromSanity(data: SanityTitleBodyPanelSection, db: SanityDataset) {
        return new TitleBodyPanelSection({
            ...TechnicolorBlock.fromSanity(data, db),
            panel: new ContentTextPanel(data.panel, db),
        });
    }
}

export class LinkPanelsSection extends TechnicolorBlock {
    readonly panels: LinkPanelWithIcon[];

    constructor(props: PropsOf<LinkPanelsSection>) {
        super(props);
        this.panels = props.panels;
    }

    static override fromSanity(data: SanityLinkPanelsSection, db: SanityDataset) {
        return new LinkPanelsSection({
            ...super.fromSanity(data, db),
            panels: data.panels.map((x) => LinkPanelWithIcon.fromSanity(x, db)),
        });
    }
}

export const coreSectionSchemaName = "coreSection";

const coreSectionSchema = defineType({
    name: coreSectionSchemaName,
    title: "Section",
    type: "document",
    fields: [...titleBodyIconFields, isVisibleField],
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
    fields: [...titleBodyIconFields, actionsFieldOptional, resourcesFieldOptional, isVisibleField],
});

export const linkPanelsSectionSchemaName = `linkPanelsSection`;

const linkPanelsSectionSchema = defineType({
    name: linkPanelsSectionSchemaName,
    title: "Link Panels Section",
    type: "object",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        sectionIconField,
        defineField({
            name: "panels",
            title: "Panels",
            type: "array",
            of: [{ type: linkPanelWithIconSchemaName }],
            validation: (rule) => rule.required().length(3),
        }),
        isVisibleField,
    ],
});

export const pageSectionSchemas = [coreSectionSchema, resourceSectionSchema, titleBodyPanelSectionSchema, linkPanelsSectionSchema];

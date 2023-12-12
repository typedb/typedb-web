import { defineType } from "@sanity/types";
import { SanityOptionalActions } from "../button";
import {
    bodyFieldRichText,
    isVisibleField,
    optionalActionsField,
    resourcesFieldOptional,
    SanityVisibleToggle,
    sectionIconField,
    titleBodyIconFields,
    titleFieldWithHighlights,
} from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { SanityBodyTextField } from "../text";
import { PropsOf } from "../util";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "./content-text-panel";

// TODO: there are two other 'SanityCoreSection' interfaces which are similar, but not quite identical
export interface SanityCoreSection extends SanityBodyTextField, SanityOptionalActions, SanityVisibleToggle {}

export interface SanityTitleBodyPanelSection extends SanityTechnicolorBlock, SanityVisibleToggle {
    panel: SanityContentTextPanel;
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

export const titleBodyPanelSectionSchemaName = "titleBodyPanelSection";

const titleBodyPanelSectionSchema = defineType({
    name: titleBodyPanelSectionSchemaName,
    title: "Title, Body & Panel",
    type: "document",
    fields: [
        titleFieldWithHighlights,
        bodyFieldRichText,
        sectionIconField,
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
    fields: [...titleBodyIconFields, optionalActionsField, resourcesFieldOptional, isVisibleField],
});

export const pageSectionSchemas = [resourceSectionSchema, titleBodyPanelSectionSchema];

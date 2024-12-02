import { defineType } from "@sanity/types";
import {
    isVisibleField, optionalActionsField, resourcesFieldOptional, SanityVisibleToggle, titleBodyIconFields,
} from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PropsOf } from "../util";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "./content-text-panel";

export interface SanityCoreSection extends SanityTechnicolorBlock, SanityVisibleToggle {}

export interface SanityTitleBodyPanelSection extends SanityCoreSection {
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

export const pageSectionSchemas = [coreSectionSchema, resourceSectionSchema, titleBodyPanelSectionSchema];

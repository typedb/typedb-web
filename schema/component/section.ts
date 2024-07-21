import { defineType } from "@sanity/types";
import { LinkButton } from "../button";
import {
    isVisibleField, optionalActionsField, resourcesFieldOptional, SanityIconField, SanityVisibleToggle, titleBodyIconFields,
} from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { BodyTextField, ParagraphWithHighlights, PortableText, SanityTitleBodyActions } from "../text";
import { PropsOf } from "../util";
import { ContentTextPanel, contentTextPanelSchemaName, SanityContentTextPanel } from "./content-text-panel";

export interface SanitySectionBase extends SanityTitleBodyActions, SanityIconField {}

export interface SanityCoreSection extends SanitySectionBase, SanityVisibleToggle {}

export interface SanityTitleBodyPanelSection extends SanityCoreSection {
    panel: SanityContentTextPanel;
}

export class SectionBase implements Partial<BodyTextField> {
    readonly title: ParagraphWithHighlights;
    readonly body?: PortableText;
    readonly actions?: LinkButton[];
    readonly sectionId: string;

    constructor(props: PropsOf<SectionBase>) {
        this.title = props.title;
        this.body = props.body;
        this.actions = props.actions;
        this.sectionId = props.sectionId;
    }

    static fromSanity(data: SanitySectionBase, db: SanityDataset) {
        const title = ParagraphWithHighlights.fromSanity(data.title);
        return new SectionBase({
            title: title,
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            sectionId: title.toSectionID(),
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

export const sectionBaseSchemaName = "sectionBase";

const sectionBaseSchema = defineType({
    name: sectionBaseSchemaName,
    title: "Section",
    type: "document",
    fields: [
        ...titleBodyIconFields,
        optionalActionsField,
        isVisibleField,
    ],
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

export const sectionSchemas = [resourceSectionSchema, titleBodyPanelSectionSchema, sectionBaseSchema];

import { defineField, defineType } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "../button";
import { SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import {
    bodyFieldRichText,
    isVisibleField,
    actionsFieldOptional,
    requiredRule,
    SanityVisibleToggle,
    titleBodyIconFields,
    titleField,
} from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { BodyTextField, PortableText, SanityBodyTextField, SanityTitleField } from "../text";
import { PropsOf } from "../util";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";

export interface SanityConclusionPanel extends SanityTitleField, SanityBodyTextField, SanityOptionalActions {
    resourceListTitle: string;
    resources: SanityTextLink[];
}

export interface SanityConclusionSection extends SanityTechnicolorBlock, SanityVisibleToggle {
    panel: SanityConclusionPanel;
}

export class ConclusionPanel implements Partial<BodyTextField> {
    readonly title: string;
    readonly body?: PortableText;
    readonly actions?: LinkButton[];
    readonly resourceListTitle: string;
    readonly resources: TextLink[];

    constructor(props: PropsOf<ConclusionPanel>) {
        this.title = props.title;
        this.body = props.body;
        this.actions = props.actions;
        this.resourceListTitle = props.resourceListTitle;
        this.resources = props.resources;
    }

    static fromSanity(data: SanityConclusionPanel, db: SanityDataset): ConclusionPanel {
        return new ConclusionPanel({
            title: data.title,
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            resourceListTitle: data.resourceListTitle,
            resources: data.resources.map((x) => TextLink.fromSanityTextLink(x, db)).filter(x => !!x) as TextLink[],
        });
    }
}

export class ConclusionSection extends TechnicolorBlock {
    readonly panel: ConclusionPanel;

    constructor(props: PropsOf<ConclusionSection>) {
        super(props);
        this.panel = props.panel;
    }

    static override fromSanity(data: SanityConclusionSection, db: SanityDataset) {
        return new ConclusionSection(
            Object.assign(TechnicolorBlock.fromSanity(data, db), {
                panel: ConclusionPanel.fromSanity(data.panel, db),
            })
        );
    }
}

export const conclusionPanelSchemaName = "conclusionPanel";

const conclusionPanelSchema = defineType({
    name: conclusionPanelSchemaName,
    title: "Conclusion Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        actionsFieldOptional,
        defineField({
            name: "resourceListTitle",
            title: "Resource List Title",
            type: "string",
            validation: requiredRule,
        }),
        defineField({
            name: "resources",
            title: "Resources",
            type: "array",
            of: [{ type: textLinkSchemaName }],
            validation: requiredRule,
        }),
    ],
});

export const conclusionSectionSchemaName = "conclusionSection";

const conclusionSectionSchema = defineType({
    name: conclusionSectionSchemaName,
    title: `Conclusion Section`,
    type: "object",
    fields: [
        ...titleBodyIconFields,
        actionsFieldOptional,
        defineField({
            name: "panel",
            title: "Panel",
            type: conclusionPanelSchemaName,
            validation: requiredRule,
        }),
        isVisibleField,
    ],
});

export const conclusionPanelSchemas = [conclusionPanelSchema, conclusionSectionSchema];

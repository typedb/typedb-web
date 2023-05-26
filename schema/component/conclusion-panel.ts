import { defineField, defineType, StringRule } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "../button";
import { SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import { bodyFieldRichText, isVisibleField, optionalActionsField, requiredRule, titleBodyIconFields, titleField } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { RichText, SanityBodyText, SanityTitle } from "../text";
import { PropsOf } from "../util";
import { SanityTechnicolorBlock, TechnicolorBlock } from "./technicolor-block";

export interface SanityConclusionPanel extends SanityTitle, SanityBodyText, SanityOptionalActions {
    resourceListTitle: string;
    resources: SanityTextLink[];
}

export interface SanityConclusionSection extends SanityTechnicolorBlock {
    panel: SanityConclusionPanel;
}

export class ConclusionPanel {
    readonly title: string;
    readonly body: RichText;
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
            body: new RichText(data.body),
            actions: data.actions?.map(x => LinkButton.fromSanity(x, db)),
            resourceListTitle: data.resourceListTitle,
            resources: data.resources.map(x => TextLink.fromSanityTextLink(x, db)),
        });
    }
}

export class ConclusionSection extends TechnicolorBlock {
    readonly panel: ConclusionPanel;

    constructor(props: PropsOf<ConclusionSection>) {
        super(props);
        this.panel = props.panel;
    }

    static fromSanityConclusionSection(data: SanityConclusionSection, db: SanityDataset) {
        return new ConclusionSection(Object.assign(TechnicolorBlock.fromSanityTechnicolorBlock(data, db), {
            panel: ConclusionPanel.fromSanity(data.panel, db)
        }));
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
        optionalActionsField,
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
            of: [{type: textLinkSchemaName}],
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
        optionalActionsField,
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

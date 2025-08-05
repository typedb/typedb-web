import { defineField, defineType } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "../button";
import { Illustration, illustrationFieldOptional, illustrationFromSanity, SanityIllustration } from "../illustration";
import { SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import {
    bodyFieldRichText, isVisibleField, actionsFieldOptional, requiredRule, SanityVisibleToggle,
    titleField, titleBodyActionsFields,
} from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, PortableText, SanityBodyTextField, SanityTitleField } from "../text";
import { PropsOf } from "../util";
import { SanitySectionCore, SectionCore } from "./section";

export interface SanityConclusionPanel extends SanityTitleField, SanityBodyTextField, SanityOptionalActions {
    resourceListTitle?: string;
    resources?: SanityTextLink[];
    illustration?: SanityReference<SanityIllustration>;
}

export interface SanityConclusionSection extends SanitySectionCore {
    panel: SanityConclusionPanel;
}

export class ConclusionPanel implements Partial<BodyTextField> {
    readonly title: string;
    readonly body?: PortableText;
    readonly actions?: LinkButton[];
    readonly resourceListTitle?: string;
    readonly resources?: TextLink[];
    readonly illustration?: Illustration;

    constructor(props: PropsOf<ConclusionPanel>) {
        this.title = props.title;
        this.body = props.body;
        this.actions = props.actions;
        this.resourceListTitle = props.resourceListTitle;
        this.resources = props.resources;
        this.illustration = props.illustration;
    }

    static fromSanity(data: SanityConclusionPanel, db: SanityDataset): ConclusionPanel {
        return new ConclusionPanel({
            title: data.title,
            body: data.body,
            actions: data.actions?.map((x) => LinkButton.fromSanity(x, db)),
            resourceListTitle: data.resourceListTitle,
            resources: data.resources?.map((x) => TextLink.fromSanityTextLink(x, db)).filter(x => !!x) as TextLink[],
            illustration: data.illustration && illustrationFromSanity(db.resolveRef(data.illustration), db),
        });
    }
}

export class ConclusionSection extends SectionCore {
    readonly panel: ConclusionPanel;

    constructor(props: PropsOf<ConclusionSection>) {
        super(props);
        this.panel = props.panel;
    }

    static override fromSanity(data: SanityConclusionSection, db: SanityDataset) {
        return new ConclusionSection(
            Object.assign(SectionCore.fromSanity(data, db), {
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
            title: "Resource List Title (optional)",
            type: "string",
        }),
        defineField({
            name: "resources",
            title: "Resources (optional)",
            type: "array",
            of: [{ type: textLinkSchemaName }],
        }),
        illustrationFieldOptional,
    ],
});

export const conclusionSectionSchemaName = "conclusionSection";

const conclusionSectionSchema = defineType({
    name: conclusionSectionSchemaName,
    title: `Conclusion Section`,
    type: "object",
    fields: [
        ...titleBodyActionsFields,
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

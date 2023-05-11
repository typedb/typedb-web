import { defineField, defineType, StringRule } from "@sanity/types";
import { LinkButton, SanityOptionalActions } from "../button";
import { SanityTextLink, TextLink, textLinkSchemaName } from "../link";
import { bodyFieldRichText, optionalActionsField, titleField } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { RichText, SanityBodyText, SanityTitle } from "../text";
import { PropsOf } from "../util";

export interface SanityConclusionPanel extends SanityTitle, SanityBodyText, SanityOptionalActions {
    resourceListTitle: string;
    resources: SanityTextLink[];
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

export const conclusionPanelSchemaName = "conclusionPanel";

export const conclusionPanelSchema = defineType({
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
            validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
            name: "resources",
            title: "Resources",
            type: "array",
            of: [{type: textLinkSchemaName}],
        }),
    ],
});

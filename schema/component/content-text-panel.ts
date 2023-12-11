import { defineField, defineType } from "@sanity/types";
import { Illustration, illustrationField, illustrationFromSanity, SanityIllustrationField } from "../illustration";
import { Link, linkSchemaName, SanityLink } from "../link";
import { bodyFieldRichText, learnMoreLinkFieldName, titleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, PortableText, SanityBodyTextField, SanityTitleField } from "../text";

export interface SanityContentTextPanel extends SanityIllustrationField, SanityBodyTextField {
    learnMoreLink?: SanityReference<SanityLink>;
}

export interface SanityTitledContentTextPanel extends SanityContentTextPanel, SanityTitleField {}

export class ContentTextPanel implements BodyTextField {
    readonly body: PortableText;
    readonly illustration: Illustration;
    readonly learnMoreLink?: Link;

    constructor(data: SanityContentTextPanel, db: SanityDataset) {
        this.illustration = illustrationFromSanity(db.resolveRef(data.illustration), db);
        this.body = data.body;
        this.learnMoreLink = data.learnMoreLink ? Link.fromSanityLinkRef(data.learnMoreLink, db) : undefined;
    }
}

export class TitledContentTextPanel extends ContentTextPanel {
    readonly title: string;

    constructor(data: SanityTitledContentTextPanel, db: SanityDataset) {
        super(data, db);
        this.title = data.title;
    }
}

export const contentTextPanelSchemaName = "contentTextPanel";
export const titledContentTextPanelSchemaName = "titledContentTextPanel";

const contentTextPanelSchema = defineType({
    name: contentTextPanelSchemaName,
    title: "Text + Illustration Panel",
    type: "object",
    fields: [
        bodyFieldRichText,
        illustrationField,
        defineField({
            name: learnMoreLinkFieldName,
            title: "'Learn More' link",
            type: "reference",
            to: [{ type: linkSchemaName }],
        }),
    ],
});

const titledContentTextPanelSchema = defineType({
    ...contentTextPanelSchema,
    name: titledContentTextPanelSchemaName,
    fields: [titleField, ...contentTextPanelSchema.fields],
});

export const contentTextPanelSchemas = [contentTextPanelSchema, titledContentTextPanelSchema];

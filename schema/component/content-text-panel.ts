import { defineField, defineType } from "@sanity/types";
import { Illustration, illustrationField, illustrationFromSanity, SanityIllustrationField } from "../illustration";
import { Link, linkSchemaName, SanityLink } from "../link";
import { bodyFieldRichText, learnMoreLinkFieldName, titleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, PortableText, SanityBodyTextField, SanityTitleField } from "../text";

export interface SanityContentTextPanel extends SanityTitleField, SanityIllustrationField, SanityBodyTextField {
    learnMoreLink?: SanityReference<SanityLink>;
}

export class ContentTextPanel implements BodyTextField {
    readonly title: string;
    readonly body: PortableText;
    readonly illustration: Illustration;
    readonly learnMoreLink?: Link;

    constructor(data: SanityContentTextPanel, db: SanityDataset) {
        this.title = data.title;
        this.illustration = illustrationFromSanity(db.resolveRef(data.illustration), db);
        this.body = data.body;
        this.learnMoreLink = data.learnMoreLink ? Link.fromSanityLinkRef(data.learnMoreLink, db) : undefined;
    }
}

export const contentTextPanelSchemaName = "contentTextPanel";

const contentTextPanelSchema = defineType({
    name: contentTextPanelSchemaName,
    title: "Text + Illustration Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        illustrationField,
        defineField({
            name: learnMoreLinkFieldName,
            title: "'Learn More' link",
            type: "reference",
            to: [{type: linkSchemaName}],
        }),
    ],
});

export const contextTextPanelSchemas = [contentTextPanelSchema];

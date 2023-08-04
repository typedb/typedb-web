import { defineField, defineType } from "@sanity/types";
import { Illustration, illustrationField, illustrationFromSanity, SanityIllustrationField } from "../illustration";
import { Link, linkSchemaName, SanityLink } from "../link";
import { bodyFieldRichText, learnMoreLinkField, learnMoreLinkFieldName, titleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { RichText, SanityBodyText, SanityTitle } from "../text";

export interface SanityContentTextPanel extends SanityTitle, SanityIllustrationField, SanityBodyText {
    learnMoreLink?: SanityReference<SanityLink>;
}

export class ContentTextPanel {
    readonly title: string;
    readonly body: RichText;
    readonly illustration: Illustration;
    readonly learnMoreLink?: Link;

    constructor(data: SanityContentTextPanel, db: SanityDataset) {
        this.title = data.title;
        this.illustration = illustrationFromSanity(db.resolveRef(data.illustration), db);
        this.body = RichText.fromSanity(data.body);
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

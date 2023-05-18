import { defineType } from "@sanity/types";
import { Illustration, illustrationField, illustrationFromSanity, SanityIllustration } from "../illustration";
import { Link, SanityLink } from "../link";
import { bodyFieldRichText, learnMoreLinkField, titleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { RichText, SanityBodyText, SanityTitle } from "../text";

export interface SanityContentPanel extends SanityTitle {
    illustration: SanityReference<SanityIllustration>;
}

export interface SanityContentTextPanel extends SanityContentPanel, SanityBodyText {
    learnMoreLink: SanityReference<SanityLink>;
}

export class ContentPanel {
    readonly title: string;
    readonly illustration: Illustration;

    constructor(data: SanityContentPanel, db: SanityDataset) {
        this.title = data.title;
        this.illustration = illustrationFromSanity(db.resolveRef(data.illustration), db);
    }
}

export class ContentTextPanel extends ContentPanel {
    readonly body: RichText;
    readonly learnMoreLink: Link;

    constructor(data: SanityContentTextPanel, db: SanityDataset) {
        super(data, db);
        this.body = new RichText(data.body);
        this.learnMoreLink = Link.fromSanityLinkRef(data.learnMoreLink, db);
    }
}

export const contentPanelSchemaName = "contentPanel";

const contentPanelSchema = defineType({
    name: contentPanelSchemaName,
    title: "Illustration Panel",
    type: "object",
    fields: [
        titleField,
        illustrationField,
    ],
});

export const contentTextPanelSchemaName = "contentTextPanel";

const contentTextPanelSchema = defineType({
    name: contentTextPanelSchemaName,
    title: "Text + Illustration Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        learnMoreLinkField,
        illustrationField,
    ],
});

export const contextTextPanelSchemas = [contentPanelSchema, contentTextPanelSchema];

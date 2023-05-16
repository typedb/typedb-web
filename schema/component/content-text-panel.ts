import { defineType } from "@sanity/types";
import { illustrationField } from "../illustration";
import { Link, SanityLink } from "../link";
import { bodyFieldRichText, learnMoreLinkField, linkField, titleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { RichText, SanityBodyText, SanityTitle } from "../text";

export interface SanityContentPanel extends SanityTitle {

}

export interface SanityContentTextPanel extends SanityContentPanel, SanityBodyText {
    learnMoreLink: SanityReference<SanityLink>;
}

export class ContentPanel {
    readonly title: string;

    constructor(data: SanityContentPanel) {
        this.title = data.title;
    }
}

export class ContentTextPanel extends ContentPanel {
    readonly body: RichText;
    readonly learnMoreLink: Link;

    constructor(data: SanityContentTextPanel, db: SanityDataset) {
        super(data);
        this.body = new RichText(data.body);
        this.learnMoreLink = Link.fromSanityLinkRef(data.learnMoreLink, db);
    }
}

export const contentPanelSchemaName = "contentPanel";

const contentPanelSchema = defineType({
    name: contentPanelSchemaName,
    title: "Content Panel",
    type: "object",
    fields: [
        titleField,
    ],
});

export const contentTextPanelSchemaName = "contentTextPanel";

const contentTextPanelSchema = defineType({
    name: contentTextPanelSchemaName,
    title: "Content/Text Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        learnMoreLinkField,
        illustrationField,
    ],
});

export const contextTextPanelSchemas = [contentPanelSchema, contentTextPanelSchema];

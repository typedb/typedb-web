import { defineType, Reference } from "@sanity/types";
import { Link } from "../link";
import { bodyFieldRichText, learnMoreLinkField, linkField, titleField } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { RichText, SanityBodyText, SanityTitle } from "../text";
import { schemaName } from "../util";

export interface SanityContentPanel extends SanityTitle {

}

export interface SanityContentTextPanel extends SanityContentPanel, SanityBodyText {
    learnMoreLink: Reference;
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
        this.learnMoreLink = new Link(db.resolveRef(data.learnMoreLink));
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
    ],
});

export const contextTextPanelSchemas = [contentPanelSchema, contentTextPanelSchema];

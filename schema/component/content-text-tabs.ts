import { defineType, Reference } from "@sanity/types";
import { Link } from "../link";
import { bodyFieldRichText, learnMoreLinkField, linkField, titleField } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { RichText, SanityBodyText, SanityTitle } from "../text";
import { schemaName } from "../util";

export interface SanityContentTab extends SanityTitle {

}

export interface SanityContentTextTab extends SanityContentTab, SanityBodyText {
    learnMoreLink: Reference;
}

export class ContentTab {
    readonly title: string;

    constructor(data: SanityContentTab) {
        this.title = data.title;
    }
}

export class ContentTextTab extends ContentTab {
    readonly body: RichText;
    readonly learnMoreLink: Link;

    constructor(data: SanityContentTextTab, db: SanityDataset) {
        super(data);
        this.body = new RichText(data.body);
        this.learnMoreLink = new Link(db.resolveRef(data.learnMoreLink));
    }
}

export const contentTabSchemaName = schemaName(ContentTab);

const contentTabSchema = defineType({
    name: contentTabSchemaName,
    title: "Content Tab",
    type: "object",
    fields: [
        titleField,
    ],
});

export const contentTextTabSchemaName = schemaName(ContentTextTab);

const contentTextTabSchema = defineType({
    name: contentTextTabSchemaName,
    title: "Content + Text Tab",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        learnMoreLinkField,
    ],
});

export const contextTextTabSchemas = [contentTabSchema, contentTextTabSchema];

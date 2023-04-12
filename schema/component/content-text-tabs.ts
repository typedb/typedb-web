import { defineType, Reference } from "@sanity/types";
import { Link, SanityLink } from "../link";
import { bodyFieldRichText, linkField, titleField } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { RichText, SanityBodyText, SanityTitle } from "../text";
import { schemaName } from "../util";

export interface SanityContentTextTab extends SanityTitle, SanityBodyText {
    learnMoreLink: Reference;
}

export class ContentTextTab {
    readonly title: string;
    readonly body: RichText;
    readonly learnMoreLink: Link;

    constructor(data: SanityContentTextTab, db: SanityDataset) {
        this.title = data.title;
        this.body = new RichText(data.body);
        this.learnMoreLink = new Link(db.resolveRef(data.learnMoreLink));
    }
}

export const contentTextTabSchemaName = schemaName(ContentTextTab);

export const contentTextTabSchema = defineType({
    name: contentTextTabSchemaName,
    title: "Content + Text Tab",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
    ],
});

import { defineType } from "@sanity/types";
import { bodyFieldRichText, linkField, titleField } from "../common-fields";
import { RichText, SanityBodyText, SanityTitle } from "../text";
import { schemaName } from "../util";

export interface SanityContentTextTab extends SanityTitle, SanityBodyText {}

export class ContentTextTab {
    readonly title: string;
    readonly body: RichText;

    constructor(data: SanityContentTextTab) {
        this.title = data.title;
        this.body = new RichText(data.body);
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

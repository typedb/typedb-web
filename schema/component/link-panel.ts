import { defineType } from "@sanity/types";
import { SanityLink, SanityTextLink } from "../action";
import { bodyFieldRichText, textLinkField, titleField } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { RichText, SanityPortableText } from "../text";
import { schemaName } from "../util";

export interface SanityLinkPanel {
    title: string;
    description: SanityPortableText;
    link: SanityTextLink;
}

export class LinkPanel {
    readonly title: string;
    readonly description: RichText;
    readonly linkText: string;
    readonly url: string;

    constructor(data: SanityLinkPanel, db: SanityDataset) {
        this.title = data.title;
        this.description = new RichText(data.description);
        this.linkText = data.link.text;
        this.url = db.resolveRef<SanityLink>(data.link.link).destination.current;
    }
}

export const linkPanelSchemaName = schemaName(LinkPanel);

export const linkPanelSchema = defineType({
    name: linkPanelSchemaName,
    title: "Link Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        textLinkField,
    ],
});

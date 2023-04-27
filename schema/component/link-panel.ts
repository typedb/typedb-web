import { defineType } from "@sanity/types";
import { LinkButton } from "../button";
import { Link, SanityTextLink } from "../link";
import { bodyFieldRichText, textLinkField, titleField } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { RichText, SanityPortableText } from "../text";

export interface SanityLinkPanel {
    title: string;
    body: SanityPortableText;
    link: SanityTextLink;
}

export class LinkPanel {
    readonly title: string;
    readonly body: RichText;
    readonly button: LinkButton;

    constructor(props: { title: string, body: RichText, button: LinkButton }) {
        this.title = props.title;
        this.body = props.body;
        this.button = props.button;
    }

    static fromSanity(data: SanityLinkPanel, db: SanityDataset) {
        return new LinkPanel({
            title: data.title,
            body: new RichText(data.body),
            button: new LinkButton({ style: "secondary", text: data.link.text, link: Link.fromSanityLinkRef(data.link.link, db) })
        });
    }
}

export const linkPanelSchemaName = "linkPanel";

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

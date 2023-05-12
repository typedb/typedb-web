import { defineType } from "@sanity/types";
import { LinkButton } from "../button";
import { Link, SanityLink, SanityTextLink } from "../link";
import { bodyFieldRichText, linkField, textLinkField, titleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { RichText, SanityPortableText } from "../text";

export interface SanityLinkPanel {
    title: string;
    body: SanityPortableText;
    link: SanityReference<SanityLink>;
}

export interface SanityLinkButtonPanel {
    title: string;
    body: SanityPortableText;
    link: SanityTextLink;
}

export class LinkPanel {
    readonly title: string;
    readonly body: RichText;
    readonly link: Link;

    constructor(props: { title: string, body: RichText, link: Link }) {
        this.title = props.title;
        this.body = props.body;
        this.link = props.link;
    }

    static fromSanity(data: SanityLinkPanel, db: SanityDataset) {
        return new LinkPanel({
            title: data.title,
            body: new RichText(data.body),
            link: Link.fromSanityLinkRef(data.link, db),
        });
    }
}

export class LinkButtonPanel {
    readonly title: string;
    readonly body: RichText;
    readonly button: LinkButton;

    constructor(props: { title: string, body: RichText, button: LinkButton }) {
        this.title = props.title;
        this.body = props.body;
        this.button = props.button;
    }

    static fromSanity(data: SanityLinkButtonPanel, db: SanityDataset) {
        return new LinkButtonPanel({
            title: data.title,
            body: new RichText(data.body),
            button: new LinkButton({ style: "secondary", text: data.link.text, link: Link.fromSanityLinkRef(data.link.link, db) })
        });
    }
}

export const linkPanelSchemaName = "linkPanel";

const linkPanelSchema = defineType({
    name: linkPanelSchemaName,
    title: "Link Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        linkField,
    ],
});

export const linkButtonPanelSchemaName = "linkButtonPanel";

const linkButtonPanelSchema = defineType({
    name: linkButtonPanelSchemaName,
    title: "Link Button Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        textLinkField,
    ],
});

export const linkPanelSchemas = [linkPanelSchema, linkButtonPanelSchema];

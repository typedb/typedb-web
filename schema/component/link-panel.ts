import { defineType } from "@sanity/types";
import { LinkButton } from "../button";
import { SanityImageRef } from "../image";
import { Link, SanityTextLink } from "../link";
import { bodyFieldRichText, sectionIconField, textLinkField, titleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { RichText, SanityPortableText } from "../text";
import { PropsOf } from "../util";

export interface SanityLinkPanel {
    title: string;
    body: SanityPortableText;
    link: SanityTextLink;
}

export interface SanityLinkPanelWithIcon extends SanityLinkPanel {
    icon: SanityReference<SanityImageRef>;
}

export class LinkPanel {
    readonly title: string;
    readonly body: RichText;
    readonly button: LinkButton;

    constructor(props: PropsOf<LinkPanel>) {
        this.title = props.title;
        this.body = props.body;
        this.button = props.button;
    }

    static fromSanityLinkPanel(data: SanityLinkPanel, db: SanityDataset) {
        return new LinkPanel({
            title: data.title,
            body: new RichText(data.body),
            button: new LinkButton({ style: "secondary", text: data.link.text, link: Link.fromSanityLinkRef(data.link.link, db) })
        });
    }
}

export class LinkPanelWithIcon extends LinkPanel {
    readonly iconURL: string;

    constructor(props: PropsOf<LinkPanelWithIcon>) {
        super(props);
        this.iconURL = props.iconURL;
    }

    static fromSanityLinkPanelWithIcon(data: SanityLinkPanelWithIcon, db: SanityDataset): LinkPanelWithIcon {
        return new LinkPanelWithIcon(Object.assign(LinkPanel.fromSanityLinkPanel(data, db), { iconURL: db.resolveImageRef(data.icon).url }));
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
        textLinkField,
    ],
});

export const linkPanelWithIconSchemaName = "linkPanelWithIcon";

const linkPanelWithIconSchema = defineType({
    name: linkPanelWithIconSchemaName,
    title: "Link Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        textLinkField,
        sectionIconField,
    ],
});

export const linkPanelSchemas = [linkPanelSchema, linkPanelWithIconSchema];

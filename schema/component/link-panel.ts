import { defineField, defineType } from "@sanity/types";
import { SanityImageRef } from "../image";
import { bodyFieldRichText, buttonField, requiredRule, sectionIconField, textLinkFieldOptional, titleField } from "../common-fields";
import { SanityTextLink, TextLink } from "../link";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, PortableText } from "../text";
import { PropsOf } from "../util";

export interface SanityLinkPanel {
    title: string;
    body: PortableText;
}

export interface SanityLinkPanelWithIcon extends SanityLinkPanel {
    icon: SanityReference<SanityImageRef>;
    link?: SanityTextLink;
}

export class LinkPanel implements BodyTextField {
    readonly title: string;
    readonly body: PortableText;

    constructor(props: PropsOf<LinkPanel>) {
        this.title = props.title;
        this.body = props.body;
    }

    static fromSanity(data: SanityLinkPanel, _db: SanityDataset): LinkPanel {
        return new LinkPanel({
            title: data.title,
            body: data.body,
        });
    }
}

export class LinkPanelWithIcon extends LinkPanel {
    readonly iconURL: string;
    readonly link?: TextLink;

    constructor(props: PropsOf<LinkPanelWithIcon>) {
        super(props);
        this.iconURL = props.iconURL;
        this.link = props.link;
    }

    static override fromSanity(data: SanityLinkPanelWithIcon, db: SanityDataset): LinkPanelWithIcon {
        return new LinkPanelWithIcon(Object.assign(LinkPanel.fromSanity(data, db), {
            iconURL: db.resolveImageRef(data.icon).url,
            link: data.link ? TextLink.fromSanityTextLink(data.link, db) : undefined,
        }));
    }
}

export const linkPanelWithIconSchemaName = "linkPanelWithIcon";

const linkPanelWithIconSchema = defineType({
    name: linkPanelWithIconSchemaName,
    title: "Link Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        sectionIconField,
        textLinkFieldOptional,
    ],
});

export const productPanelSchemaName = "productPanel";

const productPanelSchema = defineType({
    name: productPanelSchemaName,
    title: "Product Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        defineField({
            name: "secondaryBody",
            title: "Secondary Body",
            description: "Displayed under the primary body, separated by a horizontal rule",
            type: "array",
            of: [{ type: "block" }],
            validation: requiredRule,
        }),
        buttonField,
    ],
});

export const linkPanelSchemas = [linkPanelWithIconSchema, productPanelSchema];

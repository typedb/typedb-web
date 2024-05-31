import { defineField, defineType } from "@sanity/types";
import { LinkButton, SanityButton } from "../button";
import { SanityImageRef } from "../image";
import { bodyFieldRichText, buttonField, required, sectionIconField, titleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, PortableText } from "../text";
import { PropsOf } from "../util";

export interface SanityLinkPanel {
    title: string;
    body: PortableText;
}

export interface SanityLinkPanelWithIcon extends SanityLinkPanel {
    icon: SanityReference<SanityImageRef>;
    button: SanityButton;
}

export interface SanityProductPanel extends SanityLinkPanel {
    secondaryBody?: PortableText;
    button: SanityButton;
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
    readonly button: LinkButton;

    constructor(props: PropsOf<LinkPanelWithIcon>) {
        super(props);
        this.iconURL = props.iconURL;
        this.button = props.button;
    }

    static override fromSanity(data: SanityLinkPanelWithIcon, db: SanityDataset): LinkPanelWithIcon {
        return new LinkPanelWithIcon(Object.assign(LinkPanel.fromSanity(data, db), {
            iconURL: db.resolveImageRef(data.icon).url,
            button: LinkButton.fromSanity(data.button, db),
        }));
    }
}

export class ProductPanel extends LinkPanel {
    readonly secondaryBody?: PortableText;
    readonly button: LinkButton;

    constructor(props: PropsOf<ProductPanel>) {
        super(props);
        this.secondaryBody = props.secondaryBody;
        this.button = props.button;
    }

    static override fromSanity(data: SanityProductPanel, db: SanityDataset): ProductPanel {
        return new ProductPanel(Object.assign(LinkPanel.fromSanity(data, db), {
            secondaryBody: data.secondaryBody,
            button: LinkButton.fromSanity(data.button, db),
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
        buttonField,
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
        }),
        buttonField,
    ],
});

export const linkPanelSchemas = [linkPanelWithIconSchema, productPanelSchema];

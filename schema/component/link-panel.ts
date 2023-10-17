import { defineField, defineType } from "@sanity/types";
import { LinkButton, SanityButton } from "../button";
import { SanityImageRef } from "../image";
import { bodyFieldRichText, buttonField, requiredRule, sectionIconField, titleField } from "../common-fields";
import { SanityDataset, SanityReference } from "../sanity-core";
import { BodyTextField, PortableText } from "../text";
import { PropsOf } from "../util";

export interface SanityLinkPanel {
    title: string;
    body: PortableText;
    button: SanityButton;
}

export interface SanityLinkPanelWithIcon extends SanityLinkPanel {
    icon: SanityReference<SanityImageRef>;
}

export interface SanityProductPanel extends SanityLinkPanel {
    secondaryBody: PortableText;
}

export class LinkPanel implements BodyTextField {
    readonly title: string;
    readonly body: PortableText;
    readonly button: LinkButton;

    constructor(props: PropsOf<LinkPanel>) {
        this.title = props.title;
        this.body = props.body;
        this.button = props.button;
    }

    static fromSanityLinkPanel(data: SanityLinkPanel, db: SanityDataset) {
        return new LinkPanel({
            title: data.title,
            body: data.body,
            button: LinkButton.fromSanity(data.button, db),
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

export class ProductPanel extends LinkPanel {
    readonly secondaryBody: PortableText;

    constructor(props: PropsOf<ProductPanel>) {
        super(props);
        this.secondaryBody = props.secondaryBody;
    }

    static fromSanityProductPanel(data: SanityProductPanel, db: SanityDataset): ProductPanel {
        return new ProductPanel(Object.assign(LinkPanel.fromSanityLinkPanel(data, db), { secondaryBody: data.secondaryBody }))
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
        buttonField,
    ],
});

export const linkPanelWithIconSchemaName = "linkPanelWithIcon";

const linkPanelWithIconSchema = defineType({
    name: linkPanelWithIconSchemaName,
    title: "Link Panel",
    type: "object",
    fields: [
        ...linkPanelSchema.fields,
        sectionIconField,
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

export const linkPanelSchemas = [linkPanelSchema, linkPanelWithIconSchema, productPanelSchema];

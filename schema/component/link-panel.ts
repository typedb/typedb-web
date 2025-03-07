import { defineField, defineType } from "@sanity/types";
import { bodyFieldRichText, buttonField, iconNameFieldOptional, iconVariantFieldOptional, requiredRule, textLinkFieldOptional, titleField } from "../common-fields";
import { SanityTextLink, TextLink } from "../link";
import { SanityDataset } from "../sanity-core";
import { BodyTextField, PortableText } from "../text";
import { PropsOf } from "../util";

export interface SanityLinkPanel {
    title: string;
    body: PortableText;
    iconName?: string;
    iconVariant?: string;
    link?: SanityTextLink;
}

export class LinkPanel implements BodyTextField {
    readonly title: string;
    readonly body: PortableText;
    readonly iconName?: string;
    readonly iconVariant?: string;
    readonly link?: TextLink;

    constructor(props: PropsOf<LinkPanel>) {
        this.title = props.title;
        this.body = props.body;
        this.iconName = props.iconName;
        this.iconVariant = props.iconVariant;
        this.link = props.link;
    }

    static fromSanity(data: SanityLinkPanel, db: SanityDataset): LinkPanel {
        return new LinkPanel({
            title: data.title,
            body: data.body,
            iconName: data.iconName,
            iconVariant: data.iconVariant,
            link: data.link ? TextLink.fromSanityTextLink(data.link, db) : undefined,
        });
    }
}

export const linkPanelSchemaName = `linkPanel`;

const linkPanelSchema = defineType({
    name: linkPanelSchemaName,
    title: "Link Panel",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        textLinkFieldOptional,
        iconNameFieldOptional,
        iconVariantFieldOptional,
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

export const linkPanelSchemas = [linkPanelSchema, productPanelSchema];

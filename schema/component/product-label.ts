import { defineField, defineType } from "@sanity/types";
import { descriptionFieldRichText, requiredRule, textLinkField } from "../common-fields";
import { SanityTextLink, TextLink } from "../link";
import { SanityDataset } from "../sanity-core";
import { PortableText } from "../text";
import { PropsOf } from "../util";

export interface SanityProductLabel {
    description: PortableText;
    priceTag: PortableText;
    link: SanityTextLink;
}

export class ProductLabel {
    readonly description: PortableText;
    readonly priceTag: PortableText;
    readonly link?: TextLink;

    constructor(props: PropsOf<ProductLabel>) {
        this.description = props.description;
        this.priceTag = props.priceTag;
        this.link = props.link;
    }

    static fromSanity(data: SanityProductLabel, db: SanityDataset) {
        return new ProductLabel({
            description: data.description,
            priceTag: data.priceTag,
            link: TextLink.fromSanityTextLink(data.link, db),
        });
    }
}

export const productLabelSchemaName = "productLabel";

export const productLabelSchema = defineType({
    name: productLabelSchemaName,
    title: "Product Label",
    type: "object",
    fields: [
        Object.assign({}, descriptionFieldRichText, { validation: requiredRule }),
        defineField({
            name: "priceTag",
            type: "array",
            of: [{ type: "block" }],
            validation: requiredRule,
        }),
        textLinkField,
    ],
});

export const productLabelField = defineField({
    name: productLabelSchemaName,
    title: "Product Label",
    type: productLabelSchemaName,
    validation: requiredRule,
});

import { defineField, defineType } from "@sanity/types";
import { LinkButton, SanityLinkButton } from "../button";
import { bodyFieldRichText, buttonField, keyPointsFieldName, textLinkFieldOptional, titleField, titleFieldOptional } from "../common-fields";
import { SanityTextLink, TextLink } from "../link";
import { SanityDataset } from "../sanity-core";
import { PortableText } from "../text";
import { PropsOf } from "../util";

export interface SanityPricingPanel {
    title: string;
    subtitle: string;
    priceString: string;
    priceStringDetail: string;
    body: PortableText;
    button: SanityLinkButton;
    keyPoints: string[];
    bottomLink?: SanityTextLink;
}

export class PricingPanel {
    readonly title: string;
    readonly subtitle: string;
    readonly priceString: string;
    readonly priceStringDetail: string;
    readonly body: PortableText;
    readonly button: LinkButton;
    readonly keyPoints: string[];
    readonly bottomLink?: TextLink;

    constructor(props: PropsOf<PricingPanel>) {
        this.title = props.title;
        this.subtitle = props.subtitle;
        this.priceString = props.priceString;
        this.priceStringDetail = props.priceStringDetail;
        this.body = props.body;
        this.button = props.button;
        this.keyPoints = props.keyPoints;
        this.bottomLink = props.bottomLink;
    }

    static fromSanity(data: SanityPricingPanel, db: SanityDataset): PricingPanel {
        return new PricingPanel({
            title: data.title,
            subtitle: data.subtitle,
            priceString: data.priceString,
            priceStringDetail: data.priceStringDetail,
            body: data.body,
            button: LinkButton.fromSanity(data.button, db),
            keyPoints: data.keyPoints,
            bottomLink: data.bottomLink ? TextLink.fromSanityTextLink(data.bottomLink, db) : undefined,
        });
    }
}

export const pricingPanelSchemaName = "pricingPanel";

const pricingPanelSchema = defineType({
    name: pricingPanelSchemaName,
    title: "Product Panel",
    type: "object",
    fields: [
        titleField,
        Object.assign({}, titleFieldOptional, { name: "subtitle", title: "Subtitle" }),
        Object.assign({}, titleFieldOptional, { name: "priceString", title: "Price String" }),
        Object.assign({}, titleFieldOptional, { name: "priceStringDetail", title: "Price String Detail" }),
        bodyFieldRichText,
        buttonField,
        defineField({
            name: keyPointsFieldName,
            title: "Key Points",
            type: "array",
            of: [{ type: "string" }],
        }),
        Object.assign({}, textLinkFieldOptional, { name: "bottomLink", title: "Bottom Link" }),
    ],
});

export const pricingPanelSchemas = [pricingPanelSchema];

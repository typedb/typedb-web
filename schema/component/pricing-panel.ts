import { defineField, defineType } from "@sanity/types";
import { LinkButton, SanityButton } from "../button";
import { bodyFieldRichText, buttonField, keyPointsFieldName, titleField, titleFieldOptional } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PortableText } from "../text";
import { PropsOf } from "../util";

export interface SanityPricingPanel {
    title: string;
    subtitle: string;
    priceString: string;
    body: PortableText;
    button: SanityButton;
    keyPoints: string[];
}

export class PricingPanel {
    readonly title: string;
    readonly subtitle: string;
    readonly priceString: string;
    readonly body: PortableText;
    readonly button: LinkButton;
    readonly keyPoints: string[];

    constructor(props: PropsOf<PricingPanel>) {
        this.title = props.title;
        this.subtitle = props.subtitle;
        this.priceString = props.priceString;
        this.body = props.body;
        this.button = props.button;
        this.keyPoints = props.keyPoints;
    }

    static fromSanity(data: SanityPricingPanel, db: SanityDataset): PricingPanel {
        return new PricingPanel({
            title: data.title,
            subtitle: data.subtitle,
            priceString: data.priceString,
            body: data.body,
            button: LinkButton.fromSanity(data.button, db),
            keyPoints: data.keyPoints,
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
        bodyFieldRichText,
        buttonField,
        defineField({
            name: keyPointsFieldName,
            title: "Key Points",
            type: "array",
            of: [{ type: "string" }],
        }),
    ],
});

export const pricingPanelSchemas = [pricingPanelSchema];

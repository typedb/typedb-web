import { defineField, defineType } from "@sanity/types";
import { LinkButton, SanityLinkButton } from "../button";
import { buttonField, descriptionFieldRichText, required, textLinkField, titleField } from "../common-fields";
import { SanityDataset } from "../sanity-core";
import { PortableText, SanityTitleField } from "../text";
import { PropsOf } from "../util";

export interface SanityBrochure extends SanityTitleField {
    keyPoints: string[];
    priceTag: PortableText;
    button?: SanityLinkButton;
}

export class Brochure {
    readonly title: string;
    readonly keyPoints: string[];
    readonly priceTag: PortableText;
    readonly button?: LinkButton;

    constructor(props: PropsOf<Brochure>) {
        this.title = props.title;
        this.keyPoints = props.keyPoints;
        this.priceTag = props.priceTag;
        this.button = props.button;
    }

    static fromSanity(data: SanityBrochure, db: SanityDataset) {
        return new Brochure({
            title: data.title,
            keyPoints: data.keyPoints,
            priceTag: data.priceTag,
            button: data.button ? LinkButton.fromSanity(data.button, db) : undefined,
        });
    }
}

export const brochureSchemaName = "brochure";

export const brochureSchema = defineType({
    name: brochureSchemaName,
    title: "Brochure",
    type: "object",
    fields: [
        titleField,
        defineField({
            name: "keyPoints",
            type: "array",
            of: [{ type: "string" }],
            validation: required,
        }),
        defineField({
            name: "priceTag",
            type: "array",
            of: [{ type: "block" }],
            validation: required,
        }),
        buttonField,
    ],
});

export const brochureField = defineField({
    name: brochureSchemaName,
    title: "Brochure",
    type: brochureSchemaName,
    validation: required,
});

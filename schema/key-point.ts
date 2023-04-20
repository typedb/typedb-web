import { defineType, PortableTextTextBlock, Reference } from "@sanity/types";
import { bodyFieldRichText, sectionIconField, titleField } from "./common-fields";
import { SanityDataset } from "./sanity-core";
import { RichText } from "./text";

export interface SanityKeyPoint {
    title: string;
    body: PortableTextTextBlock[];
    icon: Reference;
}

export class KeyPoint {
    title: string;
    body: RichText;
    iconURL: string;

    constructor(data: SanityKeyPoint, db: SanityDataset) {
        this.title = data.title;
        this.body = new RichText(data.body);
        this.iconURL = db.resolveImageRef(data.icon).url;
    }
}

export const keyPointSchemaName = "keyPoint";

const keyPointSchema = defineType({
    name: keyPointSchemaName,
    title: "Key Point",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        sectionIconField,
    ]
});

export const keyPointSchemas = [keyPointSchema];

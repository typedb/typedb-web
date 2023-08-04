import { defineType, PortableTextTextBlock } from "@sanity/types";
import { bodyFieldRichText, sectionIconField, titleField } from "./common-fields";
import { SanityImageRef } from "./image";
import { SanityDataset, SanityReference } from "./sanity-core";
import { RichText } from "./text";

export interface SanityKeyPoint {
    title: string;
    body: PortableTextTextBlock[];
}

export interface SanityKeyPointWithIcon extends SanityKeyPoint {
    icon: SanityReference<SanityImageRef>;
}

export class KeyPoint {
    readonly title: string;
    readonly body: RichText;

    constructor(data: SanityKeyPoint) {
        this.title = data.title;
        this.body = RichText.fromSanity(data.body);
    }
}

export class KeyPointWithIcon extends KeyPoint {
    readonly iconURL: string;

    constructor(data: SanityKeyPointWithIcon, db: SanityDataset) {
        super(data);
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
    ],
});

export const keyPointWithIconSchemaName = "keyPointWithIcon";

const keyPointWithIconSchema = defineType({
    name: keyPointWithIconSchemaName,
    title: "Key Point",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        sectionIconField,
    ],
});

export const keyPointSchemas = [keyPointSchema, keyPointWithIconSchema];

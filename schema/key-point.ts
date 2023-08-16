import { defineField, defineType, PortableTextTextBlock } from "@sanity/types";
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

export interface SanityServiceKeyPoint extends SanityKeyPointWithIcon {
    checks: string[];
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

export class ServiceKeyPoint extends KeyPointWithIcon {
    readonly checks: string[];

    constructor(data: SanityServiceKeyPoint, db: SanityDataset) {
        super(data, db);
        this.checks = data.checks;
    }
}

export const keyPointSchemaName = "keyPoint";

const keyPointSchema = defineType({
    name: keyPointSchemaName,
    title: "Key Point",
    type: "object",
    fields: [titleField, bodyFieldRichText],
});

export const keyPointWithIconSchemaName = "keyPointWithIcon";

const keyPointWithIconSchema = defineType({
    name: keyPointWithIconSchemaName,
    title: "Key Point",
    type: "object",
    fields: [titleField, bodyFieldRichText, sectionIconField],
});

export const serviceKeyPointSchemaName = "serviceKeyPoint";

const serviceKeyPointSchema = defineType({
    name: serviceKeyPointSchemaName,
    title: "Key Point",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        defineField({
            name: "checks",
            title: "Check List",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "grid",
            },
        }),
        sectionIconField,
    ],
});

export const keyPointSchemas = [keyPointSchema, keyPointWithIconSchema, serviceKeyPointSchema];

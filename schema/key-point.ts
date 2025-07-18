import { defineField, defineType } from "@sanity/types";
import { bodyFieldRichText, sectionIconField, titleField } from "./common-fields";
import { SanityImageRef } from "./image";
import { SanityDataset, SanityReference } from "./sanity-core";
import { BodyTextField, PortableText, SanityBodyTextField, SanityTitleField } from "./text";

export type SanityKeyPoint = SanityTitleField & SanityBodyTextField;

export interface SanityKeyPointWithIcon extends SanityKeyPoint {
    icon: SanityReference<SanityImageRef>;
}

export interface SanityServicesKeyPoint extends SanityKeyPointWithIcon {
    checklist: string[];
}

export class KeyPoint implements BodyTextField {
    readonly title: string;
    readonly body: PortableText;

    constructor(data: SanityKeyPoint) {
        this.title = data.title;
        this.body = data.body;
    }
}

export class KeyPointWithIcon extends KeyPoint {
    readonly iconURL: string;

    constructor(data: SanityKeyPointWithIcon, db: SanityDataset) {
        super(data);
        this.iconURL = db.resolveImageRef(data.icon).url;
    }
}

export class ServicesKeyPoint extends KeyPointWithIcon {
    readonly checklist: string[];

    constructor(data: SanityServicesKeyPoint, db: SanityDataset) {
        super(data, db);
        this.checklist = data.checklist;
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

export const servicesKeyPointSchemaName = "servicesKeyPoint";

const servicesKeyPointSchema = defineType({
    name: servicesKeyPointSchemaName,
    title: "Key Point",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        defineField({
            name: "checklist",
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

export const keyPointSchemas = [keyPointSchema, keyPointWithIconSchema, servicesKeyPointSchema];

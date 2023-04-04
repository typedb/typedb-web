import { defineType, PortableTextTextBlock, Reference } from "@sanity/types";
import { bodyFieldRichText, titleField } from "./common-fields";
import { SanityDataset } from "./sanity-core";
import { ParagraphWithHighlights } from "./text";
import { schemaName } from "./util";

export interface SanityKeyPoint {
    title: string;
    body: PortableTextTextBlock[];
    icon: Reference;
}

export class KeyPoint {
    title: string;
    body: ParagraphWithHighlights;
    iconURL: string;

    constructor(data: SanityKeyPoint, db: SanityDataset) {
        this.title = data.title;
        this.body = new ParagraphWithHighlights(data.body);
        this.iconURL = db.resolveImageRef(data.icon).url;
    }
}

export const keyPointSchemaName = schemaName(KeyPoint);

const keyPointSchema = defineType({
    name: keyPointSchemaName,
    title: "Key Point",
    type: "object",
    fields: [
        titleField,
        bodyFieldRichText,
        // TODO
        // defineField({
        //     name: "icon",
        //     type: ???
        // }),
    ]
});

export const keyPointSchemas = [keyPointSchema];

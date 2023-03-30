import { defineType, PortableTextTextBlock } from "@sanity/types";
import { bodyFieldRichText, titleField } from "./common-fields";
import { ParagraphWithHighlights } from "./text";
import { schemaName } from "./util";

export interface SanityKeyPoint {
    title: string;
    body: PortableTextTextBlock[];
}

export class KeyPoint {
    title: string;
    body: ParagraphWithHighlights;

    constructor(data: SanityKeyPoint) {
        this.title = data.title;
        this.body = new ParagraphWithHighlights(data.body);
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

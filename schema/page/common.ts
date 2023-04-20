import { BlockContentIcon } from "@sanity/icons";
import { defineType, SanityDocument } from "@sanity/types";
import { Document } from "../sanity-core";

export interface SanityPage extends SanityDocument {
    title: string;
}

export abstract class Page extends Document {
    readonly title: string;

    protected constructor(data: SanityPage) {
        super(data);
        this.title = data.title;
    }
}

const bodyTextSchema = defineType({
    name: "bodyText",
    title: "Body Text",
    icon: BlockContentIcon,
    type: "array",
    of: [{type: "block"}],
});

export const basePageSchemas = [bodyTextSchema];
